import os
from dotenv import load_dotenv
import time

# ===== Configuraciones previas
load_dotenv()
if not os.getenv('URL_API'):
    print("⚠️  Warning: URL_API environment variable not set. Using default localhost.")
    print("   Set it with: export URL_API=https://your-api-domain.com")


# ===== viewing sessions
from Scripts.generate_viewing_sessions_data import ViewingSessionGenerator
generator = ViewingSessionGenerator()

print(f"{'='*15} Iniciando Generador {'='*15}")
while True:
    generator.generate_and_send_data(
        num_records = 3,
        batch_delay = 0.2
    )
    
    segs = 5
    print(f'Esperando {segs} segs...')
    time.sleep(segs)