package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"syscall"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	dst := "./uploads/"
	app := gin.Default()
	tempDir, err := os.MkdirTemp("./", "mobile_uploads_*")

	// Ensure tempDir is deleted when the program exits
	cleanup := func() {
		if err := os.RemoveAll(tempDir); err != nil {
			fmt.Printf("Failed to remove temporary directory: %v\n", err)
		}
	}
	defer cleanup()

	// Handle program termination signals to clean up tempDir
	go func() {
		sigChan := make(chan os.Signal, 1)
		signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
		<-sigChan
		cleanup()
		os.Exit(0)
	}()
	SetupCors(app)

	defer func() {
		if err := os.RemoveAll(tempDir); err != nil {
			fmt.Printf("Failed to remove temporary directory: %v\n", err)
		}
	}()

	app.GET("/", func(c *gin.Context) {
		c.File("./build/index.html")
	})

	app.GET("/fileList", func(c *gin.Context) {
		uid := c.GetHeader("uid")
		if uid == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "UID header is missing"})
			return
		}

		files, err := os.ReadDir(tempDir + string(os.PathSeparator) + uid)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read directory"})
			return
		}

		fileNames := []string{}
		for _, file := range files {
			if !file.IsDir() {
				fileNames = append(fileNames, file.Name())
			}
		}

		c.JSON(http.StatusOK, gin.H{"files": fileNames})
	})

	app.Static("/assets", "./build/assets")

	app.Static("/uploads", "./uploads")

	app.Static("/download", tempDir)

	app.POST("/", func(c *gin.Context) {
		fileUpload(dst, c)
	})

	app.POST("/mobile", func(c *gin.Context) {
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create temporary directory"})
			return
		}

		fileUpload(tempDir+string(os.PathSeparator), c)
	})

	ip := "0.0.0.0"
	interfaces, err := net.Interfaces()
	if err != nil {
		panic("Failed to get network interfaces")
	}

	for _, iface := range interfaces {
		if iface.Flags&net.FlagUp != 0 && iface.Flags&net.FlagLoopback == 0 {
			addrs, err := iface.Addrs()
			if err != nil {
				continue
			}
			for _, addr := range addrs {
				if ipNet, ok := addr.(*net.IPNet); ok && !ipNet.IP.IsLoopback() && ipNet.IP.To4() != nil {
					ip = ipNet.IP.String()
					break
				}
			}
		}
		if ip != "0.0.0.0" {
			break
		}
	}
	port := ":3000"
	println("Server running at http://" + ip + port)
	if err := openBrowser("http://" + ip + port); err != nil {
		println("Failed to open browser:", err.Error())
	}
	app.Run(ip + port)
}

func fileUpload(basePath string, c *gin.Context) {
	form, err := c.MultipartForm()
	files, ok := form.File["files"]
	uniqueID := uuid.New().String()
	folderPath := basePath + uniqueID + string(os.PathSeparator)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form"})
		return
	}

	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No files uploaded"})
		return
	}

	for _, file := range files {
		if err := os.MkdirAll(folderPath, os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
			return
		}
		if err := c.SaveUploadedFile(file, folderPath+file.Filename); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Files uploaded successfully", "uid": uniqueID})
}

func openBrowser(url string) error {
	var cmd string
	var args []string

	switch os := runtime.GOOS; os {
	case "windows":
		cmd = "rundll32"
		args = []string{"url.dll,FileProtocolHandler", url}
	case "darwin":
		cmd = "open"
		args = []string{url}
	case "linux":
		cmd = "xdg-open"
		args = []string{url}
	default:
		return fmt.Errorf("unsupported platform")
	}

	return exec.Command(cmd, args...).Start()
}
