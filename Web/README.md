# Web

{Agregar objetivo del microservicio}

## Obtención de información
La información para poder llenar las gráficas se obtiene desde el microservicio del API. Ese mismo microservicio se encarga de procesarla información, hacer los complex querys necesarios para poder enviar la información necesaria para llenar la información de las gráficas.

### Portafolio
#### Unidad 1
* Endpoint: `/api/unidad-1/portfolio`
* Metodos aceptados: `GET`
* Payload respuesta:
``` json
{
    "status":"success", // Puede ser 'success', 'error'
    "info" : {
        "engagement":{
            "completionByAge": {
                "labels": ["18-25", "26-35", "36-45", "46-55", "55+"],
                "values": [..., ..., ..., ..., ...]
            },
            "abandonmentByCountry": {
                "labels": ["México", "España", "Colombia", "Argentina", "Chile"],
                "values": [..., ..., ..., ..., ...]
            },
            "engagementBySubscription": {
                "labels": ["Basic", "Standard", "Premium"],
                "values": [..., ..., ...]
            }
        }
    }
}
```

### Proyecto
#### Unidad 1
* Endpoint: `/api/unidad-1/project`
* Metodos aceptados: `GET`
* Payload respuesta:
``` json
{
    "status":"success", // Puede ser 'success', 'error'
    "info" : {
        "distributional": {
            "labels": ["Entry-level", "Mid-level", "Senior", "Executive"],
            "data": [65000, 95000, 135000, 185000],
            "colors": ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        },
        "geographic": {
            "labels": ["Estados Unidos", "Reino Unido", "Canadá", "Alemania", "Australia"],
            "data": [145000, 85000, 92000, 78000, 105000],
            "colors": ["#9b59b6", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        },
        "remote": {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "0% Remoto", 
                    "data": [85000, 88000, 92000, 95000, 98000], 
                    "color": "#e74c3c" 
                },
                { 
                    "label": "50% Remoto", 
                    "data": [90000, 95000, 100000, 105000, 108000], 
                    "color": "#f39c12" 
                },
                { 
                    "label": "100% Remoto", 
                    "data": [95000, 102000, 110000, 118000, 125000], 
                    "color": "#2ecc71" 
                }
            ]
        },
        "roles": {
            "labels": ["ML Engineer", "Data Scientist", "Data Engineer", "Analytics Manager", "Data Analyst"],
            "data": [155000, 145000, 135000, 125000, 85000],
            "colors": ["#9b59b6", "#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        },
        "company": {
            "labels": ["Startup (S)", "Mediana (M)", "Grande (L)"],
            "data": [95000, 125000, 155000],
            "colors": ["#e74c3c", "#f39c12", "#2ecc71"]
        },
        "temporal": {
            "labels": ["2020", "2021", "2022", "2023", "2024"],
            "datasets": [
                { 
                    "label": "Entry-level", 
                    "data": [55000, 58000, 62000, 65000, 68000], 
                    "color": "#3498db" 
                },
                { 
                    "label": "Senior", 
                    "data": [115000, 125000, 135000, 145000, 155000], 
                    "color": "#e74c3c" 
                }
            ]
        }
    }
}
```

## Author(s):
* [Alan Valbuena](https://github.com/AlanVAal)
* [Sergio Barrera](https://github.com/S3RG10-B4RR3R4)