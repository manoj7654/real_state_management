# Real Estate Project Dashboard 
This project provides CRUD (Create, Read, Update, Delete) APIs for managing real estate projects, developers, towers, and series using Firebase Firestore as the database. The backend is built with Node.js and Express.js, and Firestore is used to handle data operations for developers, projects, towers, and series.

## Table of Contents
 - [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Environment Variables](#invornment-variables)

- [Project Structure](#project-structure)

- [API Endpoints](#api-endpoints)

- [Deployment Link](#deployment-link)


### Prerequisites

- Node.js
- Express.js
- Firebase Firestoremanaging data.
- MVC Architectureand Routes.


### Installation

1.  Clone the repository:


        git clone https://github.com/manoj7654/real_state_management.git
     

2.  Navigate to the project directory:

           cd backend
           cd frontend


3. Install the dependencies:

                npm install 




4. Set up Firebase and Firestore for Firebase project and obtain the required credentials.



### Environment Variables
- Create a .env file in the  project with the following environment variables:



                          
        apiKey=firebase api key
        authDomain=firebase auth domain
        projectId=firebase project id
        storageBucket=firebase storage bucket
        messagingSenderId=firebase messaging sender id
        appId=firebase api id
        measurementId=fire base measurement id
        port=port number on which you server is running

### Project Structure
                    
   `Back-end`             

                    /config
                    └── db.js 
                    /controller
                    ├── developerController.js   
                    ├── projectController.js    
                    ├── towerController.js       
                    └── seriesController.js     
                    /router
                    ├── developerRouter.js   
                    ├── projectRouter.js     
                    ├── towerRouter.js       
                    └── seriesRouter.js      
                    index.js     
                    
`Front-end`       


            ├── /css
            │   ├── index.css       
            │   ├── developer.css   
            │   ├── project.css     
            │   ├── tower.css        
            │   ├── series.css       
            │
            ├── /js
            │   ├── index.js        
            │   ├── developer.js     
            │   ├── project.js       
            │   ├── tower.js        
            │   ├── series.js        
            │
            ├── index.html           
            ├── developer.html      
            ├── project.html         
            ├── tower.html           
            ├── series.html         
                    

### API Endpoints
`Developer Routes`

#### For creatin Developer
 - Method : POST 
 - Endpoint : /api/developers
 - Description: Create a new developer.
- Request Body:


        {
        "developerName": "Developer Name",
        "address": "123 Main St, City, State",
        "incorporationDate": "2023-01-01",
        "totalProjectsDelivered": 10,
        "totalSqFtDelivered": 50000,
        "reasonForChoosingDeveloper": "Long-standing expertise",
        "websiteLink": "http://www.abcdevelopers.com"
        }
- Response: 

        {
        "id": "9X6s1BFxgqv5asS3vSVS",
        "message": "Developer created successfully"
        }

#### For getting all develper

- Method: GET

- Endpoint: /api/developers

- escription: Get all developers.

- Response:

            
            [
                {
                "id": "dev123",
                "developerName": "Developer Name",
                "address": "123 Main St, City, State",
                "incorporationDate": "2023-01-01",
                "totalProjectsDelivered": 10,
                "totalSqFtDelivered": 50000,
                "websiteLink": "http://www.abcdevelopers.com"
                },
                .....
            ]
#### For getting particular developer
- Method: GET

E- ndpoint: /api/developers/:id

- Description: Get a developer by ID.

- Response:

        {
        "developer": {
            "id": "dev123",
            "developerName": "Developer Name",
            "address": "123 Main St, City, State",
            "incorporationDate": "2023-01-01",
            "totalProjectsDelivered": 10,
            "totalSqFtDelivered": 50000,
            "websiteLink": "http://www.abcdevelopers.com"
        }
        }          
#### For update developer

- Method: PUT

- Endpoint: /api/developers/:id

- Description: Update a developer by ID.

- Request Body:

        {
        "developerName": "Manoj kumar",
        "address": "Bihar"
        }
- Response:


            {
            "message": "Developer updated successfully"
            }

#### For delete developer
- Method: DELETE

- Endpoint: /api/developers/:id

- Description: Delete a developer by ID.

- Response:


        {
        "message": "Developer deleted successfully"
        }
`Project Routes`

#### For create a project

- Method: POST

- Endpoint: /api/projects

- Description: Create a new project.

- Request Body:


        {
        "developerId": "dev123",
        "projectDetails": "Luxury residential apartments",
        "reraStatus": "Approved",
        "financials": "Budget: $10M",
        "media": "http://example.com/project-media"
        }
- Response:


        {
        "message": "Project created successfully"
        }
 #### For getting all project
 - Method: GET

- Endpoint: /api/projects

- Description: Get all projects.

- Response:


        [
        {
            "id": "az5kgJQlwdkBFk7q1ldp",
            "financials": "dddd",
            "media": [
            "https://www.google.com/"
            ],
            "developerId": "3VnalKaJIMP6jreuDY5Y",
            "reraStatus": "false",
            "projectDetails": "computer"
        },
        .....
        ]

 #### For getting particular project

 - Method: GET

- Endpoint: /api/projects/:id

- Description: Get a project by ID.

- Response:


        {
        "id": "az5kgJQlwdkBFk7q1ldp",
        "projectDetails": "computer",
        "developerId": "3VnalKaJIMP6jreuDY5Y",
        "financials": "dddd",
        "media": [
            "https://www.google.com/"
        ],
        "reraStatus": "false"
        }    

#### For update a project
- Method: PUT

- Endpoint: /api/projects/:id

- Description: Update a project by ID.

- Request Body:


            {
            "projectDetails": "Updated luxury residential apartments"
            }
- Response:

        {
        "message": "Project updated successfully",
        
        }
#### For delete a project

- Method: DELETE

- Endpoint: /api/projects/:id

- Description: Delete a project by ID.

- Response:


        {
        "message": "Project deleted successfully"
        }
`Tower Routes`

#### For create a tower

- Method: POST

- Endpoint: /api/towers

- Description: Create a new tower.

- Request Body:


            {
            "projectId": "proj123",
            "developerId": "dev123",
            "towerNumber": "Tower 1",
            "towerName": "Tower A",
            "towerPhase": "Phase 1",
            "phaseReraNumber": "RERA-1234",
            "deliveryTimeline": "2024-12-31",
            "currentStatus": "Under Construction",
            "duplicateTowerOption": "Yes",
            "totalFloors": 15,
            "towerCoreDetails": "Core details for the tower"
            }
- Response:


        {
        "message": "Tower created successfully",
        
        }
#### For getting all towers
- Method: GET

- Endpoint: /api/towers

- Description: Get all towers.

- Response:


            [
                {
                "id": "tower123",
                "projectId": "proj123",
                "developerId": "dev123",
                "towerNumber": "Tower 1",
                "towerName": "Tower A",
                "towerPhase": "Phase 1",
                "phaseReraNumber": "RERA-1234",
                "deliveryTimeline": "2024-12-31",
                "currentStatus": "Under Construction",
                "totalFloors": 15
                },
                .....
            ]

#### Fot getting particula tower
- Method: GET

- Endpoint: /api/towers/:id

- Description: Get a tower by ID.

- Response:

 {
        "id": "tower123",
            "projectId": "proj123",
            "developerId": "dev123",
            "towerNumber": "Tower 1",
            "towerName": "Tower A",
            "towerPhase": "Phase 1",
            "phaseReraNumber": "RERA-1234",
            "deliveryTimeline": "2024-12-31",
            "currentStatus": "Under Construction",
            "totalFloors": 15
        }

#### For updating tower
- Method: PUT

- Endpoint: /api/towers/:id

- Description: Update a tower by ID.

- Request Body:

        {
        "towerName": "tower2"
        }
- Response:


        {
        "message": "Tower updated successfully",

        }
#### For delete a tower

- Method: DELETE

- Endpoint: /api/towers/:id

- Description: Delete a tower by ID.

- Response:


            {
            "message": "Tower deleted successfully"
            }
`Series Routes`
#### For creating series

- Method: POST

- Endpoint: /api/series

- Description: Create a new series.

- Request Body:


        {
        "seriesName": "Series A",
        "towerId": "tower123",
        "seriesTypology": "Typology description",
        "seriesDetails": "Details of the series",
        "addOns": "Add-ons information"
        }
- Response:

        {
        "message": "Series created successfully",

        }
#### For getting all series

- Method: GET

- Endpoint: /api/series

- Description: Get all series.

- Response:

        {
        "message": "Series fetched successfully",
        "series": [
            {
            "id": "tower1",
            "seriesTypology": "3BHK",
            "addOns": "Utility, Terrace",
            "seriesDetails": "57",
            "seriesName": "Sunset Towers-1",
            "towerId": "A3zmAZQiJ2XiTIMeenHL"
            },
            {
            "id": "tower2",
            "addOns": "tarace5",
            "seriesTypology": "5BHK",
            "towerId": "J9mCOouRaFCAFL9hb6Np",
            "seriesDetails": "good",
            "seriesName": "sunset2"
            }
        ]
        }
#### For getting particular series

- Method: GET

- Endpoint: /api/series/:id

- Description: Get a series by ID.

- Response:

        {
        "id": "tower1",
        "seriesTypology": "3BHK",
        "towerId": "A3zmAZQiJ2XiTIMeenHL",
        "addOns": "Utility, Terrace",
        "seriesName": "Sunset Towers-1",
        "seriesDetails": "57"
        }
#### For updating series

- Method: PUT

- Endpoint: /api/series/:id

- Description: Update a series by ID.

- Request Body:


        {
        "seriesName": "Sunset Towers-5"
        }
- Response:

            {
            "message": "Series updated successfully",

            }
#### For delete a series

- Method: DELETE

- Endpoint: /api/series/:id

- Description: Delete a series by ID.

- Response:


        {
        "message": "Series deleted successfully"
        }

## Deployment Link

- [Back-End](https://wisdompeak.onrender.com/api/developers)
- [Front-End](https://splendid-custard-ed9f2f.netlify.app/)