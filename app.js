// Cloud DevOps Dashboard Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cloud DevOps Dashboard loaded');
    
    // DOM Elements
    const refreshBtn = document.getElementById('refreshBtn');
    const autoRefreshToggle = document.getElementById('autoRefreshToggle');
    const lastUpdatedEl = document.getElementById('lastUpdated');
    
    // Refresh button functionality
    refreshBtn.addEventListener('click', function() {
        refreshDashboard();
    });
    
    // Auto-refresh toggle
    autoRefreshToggle.addEventListener('click', function() {
        toggleAutoRefresh();
    });
    
    // Initialize dashboard
    initializeDashboard();
    
    // Functions
    function refreshDashboard() {
        console.log('Refreshing dashboard data...');
        
        // Show refreshing animation
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Update metrics with random values (simulated data)
            updateMetrics();
            
            // Update timestamp
            const now = new Date();
            lastUpdatedEl.textContent = now.toLocaleTimeString();
            
            // Reset button
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            refreshBtn.disabled = false;
            
            console.log('Dashboard refreshed at ' + now.toLocaleTimeString());
        }, 1500);
    }
    
    function toggleAutoRefresh() {
        if (autoRefreshToggle.textContent === 'Off') {
            autoRefreshToggle.textContent = 'On';
            autoRefreshToggle.style.color = '#10b981';
            
            // Start auto-refresh every 30 seconds
            window.autoRefreshInterval = setInterval(refreshDashboard, 30000);
            console.log('Auto-refresh enabled (every 30 seconds)');
        } else {
            autoRefreshToggle.textContent = 'Off';
            autoRefreshToggle.style.color = '#60a5fa';
            
            // Stop auto-refresh
            clearInterval(window.autoRefreshInterval);
            console.log('Auto-refresh disabled');
        }
    }
    
    function updateMetrics() {
        // Update API Monitoring metrics
        updateMetric('.monitoring-tile:nth-child(1) .metric:nth-child(1) .metric-value', 
                    (12500 + Math.random() * 1000).toFixed(0));
        updateMetric('.monitoring-tile:nth-child(1) .metric:nth-child(2) .metric-value', 
                    (40 + Math.random() * 10).toFixed(0) + 'ms');
        
        // Update AKS Monitoring metrics
        updateMetric('.monitoring-tile:nth-child(2) .metric:nth-child(1) .metric-value', 
                    '8');
        updateMetric('.monitoring-tile:nth-child(2) .metric:nth-child(3) .metric-value', 
                    (65 + Math.random() * 10).toFixed(0) + '%');
        
        // Update ADO Agents metrics
        updateMetric('.monitoring-tile:nth-child(3) .metric:nth-child(1) .metric-value', 
                    `${14 + Math.floor(Math.random() * 2)}/17`);
        
        // Update AppGW Monitoring metrics
        updateMetric('.monitoring-tile:nth-child(4) .metric:nth-child(1) .metric-value', 
                    (2.0 + Math.random() * 0.3).toFixed(1));
    }
    
    function updateMetric(selector, value) {
        const element = document.querySelector(selector);
        if (element) {
            // Add animation
            element.style.transform = 'scale(1.2)';
            element.style.color = '#f59e0b';
            
            setTimeout(() => {
                element.textContent = value;
                element.style.transform = 'scale(1)';
                element.style.color = '#60a5fa';
            }, 300);
        }
    }
    
    function initializeDashboard() {
        // Set initial timestamp
        const now = new Date();
        lastUpdatedEl.textContent = now.toLocaleTimeString();
        
        console.log('Dashboard initialized');
        
        // Add click effects to tiles
        document.querySelectorAll('.monitoring-tile').forEach(tile => {
            tile.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                console.log(`Clicked on: ${title}`);
                this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)';
                
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 500);
            });
        });
    }
    
    // Initial data load
    refreshDashboard();
});