# 📈 Stock Price Detection & Forecasting using LSTM

This project is a complete **stock price prediction system** built using **LSTM (Long Short-Term Memory)** neural networks. It allows users to interactively forecast future stock prices based on historical data via a live web interface.

## 🌐 Live Demo

🔗 **Access the app here**:  
(https://shiny-cucurucho-06e802.netlify.app)

### 🔍 What can you do with the app?

- 🔧 Select any stock ticker (e.g., AAPL, GOOG, TSLA)
- 🗓 Define your historical data range for training
- 📅 Choose how many days you want to forecast
- 📈 Visualize both actual and predicted closing prices on an interactive chart
- 🧠 Run a deep learning LSTM model directly from the browser

## 📌 Project Overview

Predicting stock market trends is a highly sought-after application of AI and deep learning. This project aims to provide:

- An interactive front-end to forecast stock prices
- A backend LSTM model trained on time-series stock data
- Easy deployment via Netlify so anyone can use it

**Why LSTM?**  
Stock prices are inherently sequential data. LSTM is a specialized type of Recurrent Neural Network (RNN) that captures long-term dependencies and trends in time-series data, making it well-suited for financial forecasting.

## 🧠 Features

- ✅ Real-time stock ticker input
- ✅ Interactive date pickers for historical data
- ✅ User-defined forecast horizon (e.g., 5-day, 10-day)
- ✅ Visualization of both real and predicted values
- ✅ Simple and clean UI using Shiny (or React-based front end)
- ✅ Hosted live with no setup required


## 🧰 Tech Stack

| Layer        | Tech Used                        |
|--------------|----------------------------------|
| Frontend     | Shiny Web App (R or Python Shiny) |
| Backend      | LSTM (via TensorFlow or Keras)   |
| Data Source  | Yahoo Finance (via API)          |
| Visualization| Plotly, Matplotlib, or ggplot2   |
| Deployment   | Netlify (Static hosting)         |


## 🛠 How It Works

### Step 1: Data Collection
The app pulls historical stock data (e.g., open, high, low, close) using finance APIs like Yahoo Finance or Alpha Vantage.

### Step 2: Preprocessing
- Normalization of price data using MinMaxScaler
- Windowing of time series for LSTM input (e.g., 60 past days → 1 future day)

### Step 3: LSTM Model
- Trained on past data to predict future stock prices
- Uses a sequence-to-one or sequence-to-sequence architecture
- Can be extended to multi-variate inputs (e.g., volume, indicators)

### Step 4: Prediction
- After training, the model forecasts future stock prices
- Results are de-normalized to show real price values
- Interactive charts display past + predicted data

## 📊 Example Usage

1. Select Stock: `AAPL`
2. Training Data Range: `2020-01-01` to `2025-06-30`
3. Forecast: 7 days
4. Click: **Run Forecast**

The app shows a chart with:
- Left: Actual prices from 2020 to June 2025
- Right: Predicted stock price from July 1 to July 7, 2025

## 🔮 Future Enhancements

- Add error metrics: MSE, RMSE, MAE
- Save/load model checkpoints
- Add technical indicators (RSI, MACD, Bollinger Bands)
- Deploy as REST API
- Integrate with real-time stock feeds (WebSocket)
- Enable CSV upload for custom datasets

---

## 📦 Installation (for developers)

```bash
# Clone the repo
git clone https://github.com/Akshuacharya/Stock-Price-Detection.git
cd Stock-Price-Detection

# Install dependencies
pip install -r requirements.txt

# Run the app locally
python app.py  # Or Rscript app.R if using R Shiny


## 🧑‍💻 Author

**AKSHATHA DK**
📧 [Email](akshathaakshatha705@gmail.com)
🔗 [GitHub](https://github.com/Akshuacharya)


## 📄 License

This project is licensed under the [MIT License](LICENSE).


## 🙌 Acknowledgements

* Yahoo Finance API for stock data
* TensorFlow / Keras for LSTM modeling
* Netlify for free static app hosting
* Shiny for UI and interactivity




