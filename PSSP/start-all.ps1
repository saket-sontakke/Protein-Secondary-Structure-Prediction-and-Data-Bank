# start-all.ps1
Start-Process powershell -ArgumentList "cd client; npm run dev"
Start-Process powershell -ArgumentList "cd server; npm start"
Start-Process powershell -ArgumentList "-NoExit", ".\venv\Scripts\python.exe app.py"
