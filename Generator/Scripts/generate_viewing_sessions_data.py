import os, json, random, requests, platform
from datetime import datetime, timedelta
from typing import Dict

class ViewingSessionGenerator:
    def __init__(self):
        self.api_url = os.getenv('URL_API')
        self.endpoint = f"{self.api_url}/api-db/postgres"
        
        # Configuración de datos sintéticos
        self.device_types = ["Smart TV", "Mobile", "Tablet", "Desktop", "Gaming Console"]
        self.quality_levels = ["4K", "HD", "SD", "FHD"]
        self.content_prefixes = ["M", "S", "D"]  # Movies, Series, Documentaries
        
        # Rangos realistas
        self.watch_duration_ranges = {
            "M": (80, 180),    # Movies: 80-180 minutes
            "S": (20, 60),     # Series episodes: 20-60 minutes
            "D": (30, 120)     # Documentaries: 30-120 minutes
        }
        
    def generate_session_id(self, session_number: int) -> str:
        """Generate unique session ID"""
        return f"S{session_number:04d}"
    
    def generate_user_id(self) -> str:
        """Generate random user ID"""
        return f"U{random.randint(1, 1000):03d}"
    
    def generate_content_id(self) -> str:
        """Generate random content ID"""
        prefix = random.choice(self.content_prefixes)
        number = random.randint(1, 500)
        return f"{prefix}{number:03d}"
    
    def generate_watch_date(self, days_back: int = 30) -> str:
        """Generate random watch date within last N days"""
        base_date = datetime.now() - timedelta(days=random.randint(1, days_back))
        return base_date.strftime("%Y-%m-%d")
    
    def generate_watch_duration(self, content_id: str) -> int:
        """Generate realistic watch duration based on content type"""
        content_type = content_id[0]
        min_duration, max_duration = self.watch_duration_ranges.get(content_type, (30, 120))
        return random.randint(min_duration, max_duration)
    
    def generate_completion_percentage(self, watch_duration: int) -> float:
        """Generate realistic completion percentage"""
        # Most users either watch very little or complete most of the content
        if random.random() < 0.3:  # 30% chance of early abandonment
            return round(random.uniform(5.0, 40.0), 1)
        else:  # 70% chance of high completion
            return round(random.uniform(80.0, 100.0), 1)
    
    def generate_device_and_quality(self) -> tuple:
        """Generate device type and corresponding quality level"""
        device = random.choice(self.device_types)
        
        # Quality distribution based on device capabilities
        quality_weights = {
            "Smart TV": {"4K": 0.6, "FHD": 0.3, "HD": 0.1},
            "Desktop": {"4K": 0.3, "FHD": 0.4, "HD": 0.3},
            "Tablet": {"FHD": 0.4, "HD": 0.5, "SD": 0.1},
            "Mobile": {"HD": 0.5, "SD": 0.3, "FHD": 0.2},
            "Gaming Console": {"4K": 0.7, "FHD": 0.2, "HD": 0.1}
        }
        
        weights = quality_weights.get(device, {"HD": 0.6, "SD": 0.4})
        quality = random.choices(
            list(weights.keys()), 
            weights=list(weights.values())
        )[0]
        
        return device, quality
    
    def generate_single_record(self, session_number: int) -> Dict:
        """Generate a single viewing session record"""
        content_id = self.generate_content_id()
        watch_duration = self.generate_watch_duration(content_id)
        device_type, quality_level = self.generate_device_and_quality()
        
        return {
            "session_id": self.generate_session_id(session_number),
            "user_id": self.generate_user_id(),
            "content_id": content_id,
            "watch_date": self.generate_watch_date(),
            "watch_duration_minutes": watch_duration,
            "completion_percentage": self.generate_completion_percentage(watch_duration),
            "device_type": device_type,
            "quality_level": quality_level
        }
    
    def create_payload(self, record: Dict) -> Dict:
        """Create API payload format"""
        return {
            "table": "viewing_sessions",
            "data": record
        }
    
    def send_record(self, payload: Dict) -> bool:
        """Send single record to API"""
        # try:
        #     response = requests.post(
        #         self.endpoint,
        #         json=payload,
        #         headers={"Content-Type": "application/json"},
        #         timeout=10
        #     )
            
        #     if response.status_code == 201:
        #         print(f"✅ Record sent successfully: {payload['data']['session_id']}")
        #         return True
        #     else:
        #         print(f"❌ Failed to send record: {response.status_code} - {response.text}")
        #         return False
                
        # except requests.RequestException as e:
        #     print(f"❌ Network error sending record: {str(e)}")
        #     return False
        print('Envio simulado...')
    
    def generate_and_send_data(self, num_records: int = 100, batch_delay: float = 0.1) -> Dict:
        """Generate and send multiple records"""
        import time
        
        results = {
            "total_generated": num_records,
            "successful_sends": 0,
            "failed_sends": 0,
            "records": []
        }
        
        print(f"🚀 Starting generation of {num_records} records...")
        print(f"📡 API Endpoint: {self.endpoint}")
        print("-" * 50)
        
        for i in range(1, num_records + 1):
            # Generate record
            record = self.generate_single_record(i)
            results["records"].append(record)
            
            # Create payload
            payload = self.create_payload(record)
            
            # Send to API
            success = self.send_record(payload)
            
            if success:
                results["successful_sends"] += 1
            else:
                results["failed_sends"] += 1
            
            # Small delay between requests
            time.sleep(batch_delay)
            
            # Progress update every 10 records
            if i % 10 == 0:
                print(f"📊 Progress: {i}/{num_records} records processed")
        
        print("-" * 50)
        print(f"✅ Generation completed!")
        print(f"📈 Success: {results['successful_sends']}/{num_records}")
        print(f"❌ Failed: {results['failed_sends']}/{num_records}")
        
        return results
    
    def save_generated_data(self, results: Dict, filename: str = "generated_sessions.json"):
        """Save generated data to file for backup"""
        with open(filename, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"💾 Data saved to {filename}")


if __name__ == "__main__":
    os.system('clear') if platform.system() == 'Linux' else os.system('cls')

    # Verificar variable de entorno
    if not os.getenv('URL_API'):
        print("⚠️  Warning: URL_API environment variable not set. Using default localhost.")
        print("   Set it with: export URL_API=https://your-api-domain.com")
    
    # Inicializar generador
    generator = ViewingSessionGenerator()
    
    # Generar y enviar datos
    try:
        results = generator.generate_and_send_data(
            num_records=3,  # Cambiar según necesites
            batch_delay=0.2  # Delay entre requests para no saturar el API
        )
        
        # Guardar datos generados como backup
        generator.save_generated_data(results)
        
    except KeyboardInterrupt:
        print("\n⏹️  Process interrupted by user")
    except Exception as e:
        print(f"💥 Unexpected error: {str(e)}")