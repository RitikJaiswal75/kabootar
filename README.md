# kabootar

## About

Kabootar is a PC-to-PC tool designed for seamless file sharing. It allows users to transfer any type of file quickly and efficiently between computers on the same network.

## Features

- Share any file type with ease.
- Fast and reliable transfers.
- Simple and user-friendly interface.

## Usage

1. Install Kabootar on both PCs.
2. Connect both PCs to the same network.
3. Select the file you want to share and send it to the target PC.

## Requirements

- Both PCs must be on the same local network.
- Golang runtime environment installed.

## License

This project is licensed under the MIT License.

## Building Kabootar Yourself

### Steps to Build

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kabootar.git
   cd kabootar
   ```
2. Ensure Go is installed on your system. You can download it from [golang.org](https://golang.org/).
3. Build the project:
   ```bash
   go build
   ```
   This will generate an executable file (`kabootar.exe` on Windows).

### Making Changes

1. **Backend**:

   - Navigate to the `root` directory.
   - Modify the Go files as needed to implement new features or fix bugs.
   - After making changes, rebuild the project using `go build`.

2. **Frontend**:

   - The frontend file is `index.html` in the `root` directory.
   - Edit the HTML, CSS, or JavaScript files to update the user interface.
   - If using a frontend framework, ensure you rebuild the frontend assets as required.

3. **Contributing**:
   - If you plan to contribute, follow the repository's contribution guidelines.
   - Submit a pull request with a clear description of your changes.

### Notes

- Ensure all dependencies are installed before building.
- Use version control (e.g., Git) to track your changes.
