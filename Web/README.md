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
        },
        "value":{
            "basic": [
                {"x": ..., "y": ..., "r": ...}, 
                {"x": ..., "y": ..., "r": ...}
            ],
            "standard": [
                {"x": ..., "y": ..., "r": ...},
                {"x": ..., "y": ..., "r": ...}
            ],
            "premium": [
                {"x": ..., "y": ..., "r": ...},
                {"x": ..., "y": ..., "r": ...}
            ]
        },
        "temporal":{
            "labels": ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
            "cohorts": {
                "enero":   [..., ..., ..., ..., ..., ...],
                "febrero": [..., ..., ..., ..., ..., ...],
                "marzo":   [..., ..., ..., ..., ..., ...]
            }
        },
        "technical":{
            "labels": ["Mobile", "Desktop", "TV", "Tablet"],
            "duration":   [..., ..., ..., ...],
            "completion": [..., ..., ..., ...]
        },
        "segmentation":{
            "heavyUsers": [
                {"x": ..., "y": ...},
                {"x": ..., "y": ...},
                {"x": ..., "y": ...}
            ],
            "regularUsers": [
                {"x": ..., "y": ...},
                {"x": ..., "y": ...},
                {"x": ..., "y": ...}
            ],
            "casualViewers": [
                {"x": ..., "y": ...},
                {"x": ..., "y": ...},
                {"x": ..., "y": ...}
            ]
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
```

## Author(s):
* [Alan Valbuena](https://github.com/AlanVAal)
* [Sergio Barrera](https://github.com/S3RG10-B4RR3R4)