"use strict";

const browserInfo = `${platform.name}, ${platform.version}`;
const os = navigator.platform;
const width = screen.width;
const height = screen.height
const availWidth = screen.availWidth;
const availHeight = screen.availHeight;

const currentDate = new Date();
const formattedDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
const formattedTime = {
    hour: "2-digit",
    minute: "2-digit"
};

let text = `
    <p>Browser name and version: ${browserInfo}</p>
    <p>Operating system: ${os}</p>
    <p>Screen width: ${width}px, height: ${height}px</p>
    <p>Available screen space for browser - width: ${availWidth}px, height: ${availHeight}px</p>
    <p>${currentDate.toLocaleDateString("fi-FI", formattedDate)}</p>
    <p>Time: ${currentDate.toLocaleTimeString("fi-FI", formattedTime)}</p>
`;

const target = document.querySelector("#target");
target.innerHTML = text;

