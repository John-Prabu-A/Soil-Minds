import React from 'react';
import Header from "../header/Header.jsx";
import "./CropPage.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

//--------------------------------------------------------------------

// Focus on Empty Input fields
function focusEmptyFields() {
    // list of all the input elements
    const inputElements = [
        document.getElementById('nitrogen-crop-input'),
        document.getElementById('temp-crop-input'),
        document.getElementById('phosphorous-crop-input'),
        document.getElementById('humidity-crop-input'),
        document.getElementById('potassium-crop-input'),
        document.getElementById('ph-crop-input'),
        document.getElementById('rainfall-crop-input'),
    ];

    // Check if any of the input fields is empty & focus on it
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value === '') {
            inputElements[i].focus();
            return false;
        }
    }

    return true;
}

//--------------------------------------------------------------------

const CROP_ENDPOINT = 'https://8080-797137136eb6451193a1f8c64a951490.onpatr.cloud/crop_recommend';

// Min-Max values of crop inputs
export const crop_value_ranges = {
    nitrogen: [0, 150], phosphorous: [5, 145], potassium: [5, 205], temperature: [0, 50],
    humidity: [1, 100], ph: [3, 10], rainfall: [20, 300]
};
function findSuitableCrop(N, P, K, temperature, humidity, pH, rainfall) {
    const cropPredictor = {
        'apple': 0,
        'banana': 0,
        'blackgram': 0,
        'chickpea': 0,
        'coconut': 0,
        'coffee': 0,
        'cotton': 0,
        'grapes': 0,
        'jute': 0,
        'kidneybeans': 0,
        'lentil': 0,
        'maize': 0,
        'mango': 0,
        'mothbeans': 0,
        'mungbean': 0,
        'muskmelon': 0,
        'orange': 0,
        'papaya': 0,
        'pigeonpeas': 0,
        'pomegranate': 0,
        'rice': 0,
        'watermelon': 0
    };
    const cropData = [
        {
            label: 'apple',
            min_N: 24.5,
            max_N: 57.2,
            min_P: 49.5,
            max_P: 77.2,
            min_K: 43.8,
            max_K: 67.2,
            min_temperature: 22.7,
            max_temperature: 26.6,
            min_humidity: 69.4,
            max_humidity: 78.2,
            min_ph: 5.3,
            max_ph: 6.4,
            min_rainfall: 70.3,
            max_rainfall: 82.9,
        },
        {
            label: 'banana',
            min_N: 90.7,
            max_N: 108.8,
            min_P: 75.5,
            max_P: 92.1,
            min_K: 50.7,
            max_K: 55.8,
            min_temperature: 26.1,
            max_temperature: 28.6,
            min_humidity: 76.5,
            max_humidity: 80.1,
            min_ph: 5.4,
            max_ph: 5.8,
            min_rainfall: 92.1,
            max_rainfall: 98.1,
        },
        {
            label: 'blackgram',
            min_N: 29.1,
            max_N: 55.2,
            min_P: 66.8,
            max_P: 78.7,
            min_K: 21.1,
            max_K: 30.8,
            min_temperature: 25.3,
            max_temperature: 32.3,
            min_humidity: 63.4,
            max_humidity: 67.9,
            min_ph: 6.0,
            max_ph: 6.7,
            min_rainfall: 62.6,
            max_rainfall: 68.2,
        },
        {
            label: 'chickpea',
            min_N: 24.8,
            max_N: 51.3,
            min_P: 65.4,
            max_P: 75.2,
            min_K: 79.4,
            max_K: 82.1,
            min_temperature: 17.9,
            max_temperature: 19.9,
            min_humidity: 15.4,
            max_humidity: 16.8,
            min_ph: 5.0,
            max_ph: 7.3,
            min_rainfall: 69.5,
            max_rainfall: 76.8,
        },
        {
            label: 'coconut',
            min_N: 19.6,
            max_N: 33.1,
            min_P: 7.2,
            max_P: 27.9,
            min_K: 26.8,
            max_K: 29.6,
            min_temperature: 25.2,
            max_temperature: 27.4,
            min_humidity: 92.4,
            max_humidity: 99.2,
            min_ph: 5.0,
            max_ph: 5.4,
            min_rainfall: 90.0,
            max_rainfall: 100.0,
        },
        {
            label: 'coffee',
            min_N: 84.5,
            max_N: 118.3,
            min_P: 16.8,
            max_P: 32.2,
            min_K: 28.6,
            max_K: 33.3,
            min_temperature: 23.4,
            max_temperature: 25.4,
            min_humidity: 53.2,
            max_humidity: 59.4,
            min_ph: 6.3,
            max_ph: 6.8,
            min_rainfall: 85.0,
            max_rainfall: 100.0,
        },
        {
            label: 'cotton',
            min_N: 105.7,
            max_N: 134.3,
            min_P: 37.5,
            max_P: 54.1,
            min_K: 17.8,
            max_K: 21.8,
            min_temperature: 22.8,
            max_temperature: 24.0,
            min_humidity: 79.2,
            max_humidity: 80.9,
            min_ph: 5.2,
            max_ph: 6.5,
            min_rainfall: 65.3,
            max_rainfall: 87.4,
        },
        {
            label: 'grapes',
            min_N: 13.2,
            max_N: 39.2,
            min_P: 134.4,
            max_P: 139.2,
            min_K: 202.0,
            max_K: 203.2,
            min_temperature: 8.3,
            max_temperature: 41.0,
            min_humidity: 80.7,
            max_humidity: 82.3,
            min_ph: 5.4,
            max_ph: 5.7,
            min_rainfall: 67.6,
            max_rainfall: 73.6,
        },
        {
            label: 'jute',
            min_N: 68.0,
            max_N: 78.8,
            min_P: 40.5,
            max_P: 51.9,
            min_K: 36.3,
            max_K: 42.4,
            min_temperature: 23.2,
            max_temperature: 24.4,
            min_humidity: 72.6,
            max_humidity: 87.0,
            min_ph: 6.0,
            max_ph: 6.4,
            min_rainfall: 100.0,
            max_rainfall: 100.0,
        },
        {
            label: 'kidneybeans',
            min_N: 18.1,
            max_N: 38.5,
            min_P: 55.1,
            max_P: 77.3,
            min_K: 15.1,
            max_K: 25.1,
            min_temperature: 15.7,
            max_temperature: 23.3,
            min_humidity: 19.8,
            max_humidity: 23.6,
            min_ph: 5.4,
            max_ph: 5.5,
            min_rainfall: 64.9,
            max_rainfall: 100.0,
        },
        {
            label: 'lentil',
            min_N: 15.7,
            max_N: 35.3,
            min_P: 57.0,
            max_P: 78.1,
            min_K: 16.7,
            max_K: 24.7,
            min_temperature: 18.9,
            max_temperature: 28.0,
            min_humidity: 62.8,
            max_humidity: 68.5,
            min_ph: 5.1,
            max_ph: 6.2,
            min_rainfall: 38.8,
            max_rainfall: 54.9,
        },
        {
            label: 'maize',
            min_N: 64.1,
            max_N: 97.2,
            min_P: 38.3,
            max_P: 59.5,
            min_K: 18.8,
            max_K: 22.2,
            min_temperature: 19.5,
            max_temperature: 25.4,
            min_humidity: 56.7,
            max_humidity: 71.5,
            min_ph: 5.2,
            max_ph: 6.4,
            min_rainfall: 61.2,
            max_rainfall: 92.0,
        },
        {
            label: 'mango',
            min_N: 15.2,
            max_N: 38.2,
            min_P: 17.6,
            max_P: 34.2,
            min_K: 28.1,
            max_K: 34.5,
            min_temperature: 27.5,
            max_temperature: 33.5,
            min_humidity: 46.8,
            max_humidity: 53.2,
            min_ph: 4.5,
            max_ph: 5.8,
            min_rainfall: 84.6,
            max_rainfall: 96.9,
        },
        {
            label: 'mothbeans',
            min_N: 12.1,
            max_N: 39.5,
            min_P: 37.8,
            max_P: 57.5,
            min_K: 17.0,
            max_K: 25.1,
            min_temperature: 24.7,
            max_temperature: 31.3,
            min_humidity: 42.2,
            max_humidity: 63.6,
            min_ph: 3.8,
            max_ph: 9.0,
            min_rainfall: 30.2,
            max_rainfall: 69.4,
        },
        {
            label: 'mungbean',
            min_N: 14.2,
            max_N: 39.6,
            min_P: 37.9,
            max_P: 56.2,
            min_K: 15.8,
            max_K: 25.4,
            min_temperature: 27.3,
            max_temperature: 29.4,
            min_humidity: 80.5,
            max_humidity: 88.9,
            min_ph: 5.9,
            max_ph: 6.6,
            min_rainfall: 37.5,
            max_rainfall: 58.6,
        },
        {
            label: 'muskmelon',
            min_N: 83.3,
            max_N: 116.6,
            min_P: 5.8,
            max_P: 30.4,
            min_K: 48.3,
            max_K: 54.7,
            min_temperature: 27.2,
            max_temperature: 28.7,
            min_humidity: 91.4,
            max_humidity: 92.8,
            min_ph: 6.0,
            max_ph: 6.2,
            min_rainfall: 20.6,
            max_rainfall: 28.7,
        },
        {
            label: 'orange',
            min_N: 17.2,
            max_N: 37.8,
            min_P: 6.7,
            max_P: 29.1,
            min_K: 6.1,
            max_K: 13.1,
            min_temperature: 11.2,
            max_temperature: 33.1,
            min_humidity: 91.7,
            max_humidity: 93.2,
            min_ph: 6.1,
            max_ph: 6.7,
            min_rainfall: 100.0,
            max_rainfall: 100.0,
        },
        {
            label: 'papaya',
            min_N: 33.0,
            max_N: 57.5,
            min_P: 46.4,
            max_P: 69.3,
            min_K: 46.0,
            max_K: 55.4,
            min_temperature: 23.5,
            max_temperature: 42.4,
            min_humidity: 91.6,
            max_humidity: 93.3,
            min_ph: 6.0,
            max_ph: 6.2,
            min_rainfall: 39.9,
            max_rainfall: 98.6,
        },
        {
            label: 'pigeonpeas',
            min_N: 19.2,
            max_N: 39.3,
            min_P: 55.4,
            max_P: 79.3,
            min_K: 16.8,
            max_K: 24.9,
            min_temperature: 19.1,
            max_temperature: 36.2,
            min_humidity: 30.9,
            max_humidity: 68.3,
            min_ph: 4.4,
            max_ph: 7.3,
            min_rainfall: 92.7,
            max_rainfall: 98.5,
        },
        {
            label: 'pomegranate',
            min_N: 20.1,
            max_N: 37.2,
            min_P: 6.2,
            max_P: 29.2,
            min_K: 36.6,
            max_K: 44.0,
            min_temperature: 18.7,
            max_temperature: 24.0,
            min_humidity: 86.2,
            max_humidity: 93.7,
            min_ph: 5.3,
            max_ph: 7.0,
            min_rainfall: 100.0,
            max_rainfall: 100.0,
        },
        {
            label: 'rice',
            min_N: 67.1,
            max_N: 93.2,
            min_P: 39.2,
            max_P: 57.4,
            min_K: 38.8,
            max_K: 41.5,
            min_temperature: 21.6,
            max_temperature: 25.3,
            min_humidity: 60.4,
            max_humidity: 83.8,
            min_ph: 5.1,
            max_ph: 7.2,
            min_rainfall: 95.0,
            max_rainfall: 100.0,
        },
        { label: 'watermelon', min_N: 80, max_N: 120, min_P: 5, max_P: 30, min_K: 45, max_K: 55, min_temperature: 24, max_temperature: 26, min_humidity: 80, max_humidity: 89, min_ph: 6, max_ph: 6, min_rainfall: 40, max_rainfall: 59 }
    ];

    for (const crop of cropData) {
        if (N >= crop.min_N && N <= crop.max_N) cropPredictor[crop.label]++;
        if (P >= crop.min_P && P <= crop.max_P) cropPredictor[crop.label]++;
        if (K >= crop.min_K && K <= crop.max_K) cropPredictor[crop.label]++;
        if (temperature >= crop.min_temperature && temperature <= crop.max_temperature) cropPredictor[crop.label]++;
        if (humidity >= crop.min_humidity && humidity <= crop.max_humidity) cropPredictor[crop.label]++;
        if (pH >= crop.min_ph && pH <= crop.max_ph) cropPredictor[crop.label]++;
        if (rainfall >= crop.min_rainfall && rainfall <= crop.max_rainfall) cropPredictor[crop.label]++;
    }

    let maxScore = 0;
    let bestCrop = 'maize';

    for (const crop in cropPredictor) {
        if (cropPredictor[crop] > maxScore) {
            maxScore = cropPredictor[crop];
            bestCrop = crop;
        }
    }

    return bestCrop;
}


// Called when Button Clicked
function handleClick(navigate) {
    // Continue only if all fields are filled.
    const isFieldEmpty = focusEmptyFields();
    if (!isFieldEmpty) {
        console.log("Some Inputs are empty !");
        return;
    }

    // Get the values of all input fields
    const nitrogenValue = parseFloat(document.getElementById('nitrogen-crop-input').value);
    const tempValue = parseFloat(document.getElementById('temp-crop-input').value);
    const phosphorousValue = parseFloat(document.getElementById('phosphorous-crop-input').value);
    const humidityValue = parseFloat(document.getElementById('humidity-crop-input').value);
    const potassiumValue = parseFloat(document.getElementById('potassium-crop-input').value);
    const phValue = parseFloat(document.getElementById('ph-crop-input').value);
    const rainfallValue = parseFloat(document.getElementById('rainfall-crop-input').value);

    // Check if the Input values are in required ranges
    const min_temp = crop_value_ranges.temperature[0];
    const max_temp = crop_value_ranges.temperature[1];
    const min_humid = crop_value_ranges.humidity[0];
    const max_humid = crop_value_ranges.humidity[1];
    if (tempValue < min_temp || tempValue > max_temp) {
        window.alert("Temperature must be between 0-50 Celsius !");
        return;
    } else if (humidityValue < min_humid || humidityValue > max_humid) {
        window.alert("Humidity must be between 1-100 !");
        return;
    }

    // Make progressbar visible
    const progressBar = document.querySelector('.crop-progress-bar');
    progressBar.style.display = 'block';
    progressBar.style.visibility = 'visible';

    // Call the crop prediction function
    const suitableCrop = findSuitableCrop(
        nitrogenValue, phosphorousValue, potassiumValue,
        tempValue, humidityValue, phValue, rainfallValue
    );

    // Redirect to Result page along with predicted crop
    navigate("/crop_result", { state: { predicted_crop: suitableCrop } });
}

//--------------------------------------------------------------------

export function CropPage() {
    const navigate = useNavigate();

    // Called when Enter is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleClick(navigate);
        }
    });

    return (
        <>
            <Header />
            <LinearProgress style={{ visibility: 'hidden', display: 'none' }} className="crop-progress-bar" color="success" />
            <p className="crop-p">
                Provide soil characteristics to identify the most suitable <b>CROP</b> for cultivation on your farm. 🌱🚜👨‍🌾
            </p>
            <div className="crop-container">
                <TextField id="nitrogen-crop-input" label="Ratio of Nitrogen" variant="outlined" color="success" type="number" />
                <TextField id="temp-crop-input" label="Temperature in Celsius" variant="outlined" color="success" type="number" inputProps={{ min: 5, max: 50 }} />
                <TextField id="phosphorous-crop-input" label="Ratio of Phosphorous" variant="outlined" color="success" type="number" />
                <TextField id="humidity-crop-input" label="% of Humidity" variant="outlined" color="success" type="number" />
                <TextField id="potassium-crop-input" label="Ratio of Potassium" variant="outlined" color="success" type="number" />
                <TextField id="ph-crop-input" label="PH Level of soil" variant="outlined" color="success" type="number" />
                <TextField id="rainfall-crop-input" label="Rainfall in Milimeter (mm)" variant="outlined" color="success" type="number" />
                <button className="predict_crop_btn" onClick={() => handleClick(navigate)}> PREDICT </button>
            </div>
        </>
    );
}