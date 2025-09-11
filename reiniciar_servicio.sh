clear

cd ~/UPY/visualization-tools-IX/
docker compose down
git restore .
git pull origin main
git submodule update --remote
docker compose up --build -d

cd ~/XPERTIA/Reverse-Proxy-xpert-IA/
docker compose down
git restore .
git pull origin main
docker compose up --build -d