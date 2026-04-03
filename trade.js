// Floating TradingView Logic
const chartContainer = document.getElementById('candleChart');
let currentPriceOffset = 0; // Vertical float offset
const maxCandles = 65; // Adjust based on your screen width

/**
 * Generates a single candlestick and adds it to the chart
 */
function generateCandle() {
    const candle = document.createElement('div');
    
    // Calculate price movement (High Volatility)
    const move = (Math.random() - 0.5) * 45; 
    const bodyHeight = Math.max(Math.abs(move), 3); // Minimum body size
    const isUp = move > 0;
    
    // Update vertical trend position
    currentPriceOffset -= move; 

    // Reset trend if it goes too far off-center
    if (Math.abs(currentPriceOffset) > 180) {
        currentPriceOffset = currentPriceOffset > 0 ? 100 : -100;
    }

    // Set classes and visual styles
    candle.className = `candle ${isUp ? 'up' : 'down'}`;
    candle.style.height = `${bodyHeight}px`;
    
    // Apply floating vertical transform
    candle.style.transform = `translateY(${currentPriceOffset}px)`;

    chartContainer.appendChild(candle);

    // Maintain stable performance by removing old candles
    if (chartContainer.children.length > maxCandles) {
        chartContainer.removeChild(chartContainer.children[0]);
    }
}

/**
 * INITIALIZATION: Populate the screen instantly
 */
function initChart() {
    for (let i = 0; i < maxCandles; i++) {
        generateCandle();
    }
}

// Start immediately
initChart();

/**
 * CONSTANT HIGH-FREQUENCY UPDATE
 * Simulates active but "denied" market data
 */
setInterval(generateCandle, 450); 

// Footer Stat Updates (Ping simulation)
setInterval(() => {
    const pingDisplay = document.querySelector('.market-stats .stat:last-child');
    if (pingDisplay) {
        const ms = Math.floor(Math.random() * 40) + 185;
        pingDisplay.innerHTML = `<span>PING:</span> ${ms} ms`;
    }
}, 2500);

// Simple Balance Bar filler (Optional)
const walletVal = document.querySelector('.value');
if (walletVal) {
    walletVal.style.transition = 'color 0.5s ease';
    setInterval(() => {
        walletVal.style.color = Math.random() > 0.5 ? '#ff3344' : '#fff';
    }, 1000);
}