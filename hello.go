package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"runtime"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	dst := "./uploads/"
	app := gin.Default()
	SetupCors(app)

	app.GET("/", func(c *gin.Context) {
		c.File("./build/index.html")
	})

	app.Static("/assets", "./build/assets")

	app.POST("/", func(c *gin.Context) {
		form, err := c.MultipartForm()
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form"})
			return
		}

		files, ok := form.File["files"]
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No files uploaded"})
			return
		}

		uuid := uuid.New().String()
		for _, file := range files {
			folderPath := dst + uuid + "/"
			if err := os.MkdirAll(folderPath, os.ModePerm); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
				return
			}
			if err := c.SaveUploadedFile(file, folderPath+file.Filename); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
				return
			}
		}
		c.JSON(http.StatusCreated, gin.H{"message": "Files uploaded successfully"})
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
	if err := openBrowser("http://" + ip + port + "/?role=sender"); err != nil {
		println("Failed to open browser:", err.Error())
	}
	app.Run(ip + port)
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
