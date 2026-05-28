@echo off
cd /d "c:\Users\bhask\Desktop\agency website"

echo Setting up git configuration...
git config --global user.name "Copilot"
git config --global user.email "223556219+Copilot@users.noreply.github.com"

echo Adding remote repository...
git remote add origin https://github.com/0xCyberMind/Agency_webiste

echo Staging all files...
git add .

echo Creating initial commit...
git commit -m "Initial project setup with Next.js, Three.js, and animations - Created Next.js 14 project with TypeScript and Tailwind CSS - Implemented 3D AI orb with React Three Fiber animations - Added 8 main sections with glassmorphism design - Integrated particle background and cursor trail effects - Implemented AI chatbot demo with typing effect - Created pricing calculator with toggle functionality - Added contact form with validation - Implemented loading screen with boot sequence - Added responsive navigation and hero sections Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Upload complete! Your project is now on GitHub.
pause
