# MyQRy 🎨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/your-username/myqry?style=social)](https://github.com/your-username/myqry/stargazers)

MyQRy is a modern web app for generating and scanning QR codes. Create custom QR codes from URLs or text with color and logo options, or scan them via camera or file upload. Featuring a smooth, user-friendly UI with animations, it offers a complete and reliable QR solution.

**[➡️ Live Demo (https://my-qry.netlify.app/)](#)**

---

![MyQRy Screenshot](https://via.placeholder.com/800x450.png?text=MyQRy+Application+Screenshot)
*(Replace this placeholder with a real screenshot or GIF of your application)*

## ✨ Features

* **🎨 Custom QR Code Generation**: Create unique QR codes from any URL or text input.
* **🖼️ Logo & Color Integration**: Personalize your QR codes by choosing a custom color and embedding your own logo in the center.
* **📥 High-Quality Download**: Download the generated QR code as a high-resolution image file directly to your device.
* **📸 Camera Scanning**: Scan QR codes instantly and seamlessly using your device's camera.
* **⬆️ File Upload Scanning**: Decode QR codes by uploading an image file from your device.
* **📱 Responsive Design**: A clean, intuitive, and fully responsive interface that works flawlessly on all devices.
* **🎬 Smooth Animations**: Enjoy a fluid user experience with delightful animations powered by **Framer Motion**.

## 🛠️ Tech Stack

* **Frontend:** React / Vite 
* **Animation:** Framer Motion
* **QR Code Generation:** [`qrcode.react`]
* **QR Code Scanning:** [`react-qr-reader`]
* **Deployment:** Netlify

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or later) and a package manager like npm or yarn installed on your computer.

```bash
# Check if Node.js is installed
node -v
# Check if npm is installed
npm -v

---

Clone the repository:

git clone https://github.com/ayoub-ouazene/My-QRy.git

Navigate to the project directory:
cd MyQRy

Install the dependencies:
npm install
# or
yarn install


Run the development server:

Open http://localhost:3000 (or the port shown in your terminal) with your browser to see the result


Usage
To Generate a QR Code:
1.Navigate to the "Generate" section.

2.Enter the URL or text you want to encode.

3.Use the color picker to select a custom color for the QR code.

4.Optionally, click "Upload Logo" to add an image to the center.

5.Click the "Download" button to save the QR code to your device.

To Scan a QR Code:

1.Navigate to the "Scan" section.

2.Grant camera permissions to the browser to start scanning live.

3.Alternatively, click "Upload File" and select an image containing a QR code from your device. The decoded information will appear on the screen.


📜 License
This project is distributed under the MIT License. See LICENSE.txt for more information.

📧 Contact

Ayoub Ouazene - ayoub.ouazene@ensia.edu.dz

Project Link: https://github.com/ayoub-ouazene/My-QRy
