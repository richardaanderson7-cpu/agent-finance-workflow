// Load and display data
async function loadData() {
    try {
        const response = await fetch('data/reports.json');
        const data = await response.json();
        
        displayMetrics(data.operational_metrics, data.financial_statements);
        displayIncomeStatement(data.financial_statements.income_statement);
        displayBalanceSheet(data.financial_statements.balance_sheet);
        displayCapabilities(data.system_capabilities);
        displayDisclaimer(data.disclaimer);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function displayMetrics(metrics, financials) {
    const grid = document.getElementById('metrics-grid');
    
    const metricCards = [
        {
            label: 'Net Income',
            value: `$${financials.income_statement.net_income.toLocaleString()}`,
            icon: '💰',
            color: 'bg-green-100 text-green-800'
        },
        {
            label: 'Total Assets',
            value: `$${financials.balance_sheet.total_assets.toLocaleString()}`,
            icon: '📊',
            color: 'bg-blue-100 text-blue-800'
        },
        {
            label: 'Transactions',
            value: metrics.total_transactions.toLocaleString(),
            icon: '📝',
            color: 'bg-purple-100 text-purple-800'
        },
        {
            label: 'Customers',
            value: metrics.total_customers.toLocaleString(),
            icon: '👥',
            color: 'bg-orange-100 text-orange-800'
        }
    ];
    
    grid.innerHTML = metricCards.map(metric => `
        <div class="metric-card bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl">${metric.icon}</span>
                <span class="${metric.color} px-3 py-1 rounded-full text-sm font-semibold">
                    ${metric.value}
                </span>
            </div>
            <h4 class="text-gray-600 text-sm font-medium">${metric.label}</h4>
        </div>
    `).join('');
}

function displayIncomeStatement(data) {
    const container = document.getElementById('income-statement');
    
    container.innerHTML = `
        <div class="flex justify-between py-2 border-b">
            <span class="text-gray-700">Revenue</span>
            <span class="font-semibold">$${data.revenue.toLocaleString()}</span>
        </div>
        <div class="flex justify-between py-2 border-b">
            <span class="text-gray-700">Cost of Goods Sold</span>
            <span class="font-semibold text-red-600">($${data.cogs.toLocaleString()})</span>
        </div>
        <div class="flex justify-between py-2 border-b bg-gray-50 px-2 -mx-2">
            <span class="font-semibold">Gross Profit</span>
            <span class="font-bold">$${data.gross_profit.toLocaleString()}</span>
        </div>
        <div class="flex justify-between py-2 text-sm text-gray-600">
            <span>Gross Margin</span>
            <span>${data.gross_margin_pct.toFixed(1)}%</span>
        </div>
        <div class="flex justify-between py-2 border-t-2 border-gray-300 mt-4 pt-4">
            <span class="font-bold text-lg">Net Income</span>
            <span class="font-bold text-lg text-green-600">$${data.net_income.toLocaleString()}</span>
        </div>
        ${data.is_balanced !== undefined ? `
            <div class="mt-4 text-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ Books Balanced
                </span>
            </div>
        ` : ''}
    `;
}

function displayBalanceSheet(data) {
    const container = document.getElementById('balance-sheet');
    
    container.innerHTML = `
        <div class="mb-4">
            <h4 class="text-sm font-semibold text-gray-500 uppercase mb-2">Assets</h4>
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-700">Cash</span>
                    <span class="font-semibold">$${data.cash.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-700">Accounts Receivable</span>
                    <span class="font-semibold">$${data.accounts_receivable.toLocaleString()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-700">Inventory</span>
                    <span class="font-semibold">$${data.inventory.toLocaleString()}</span>
                </div>
                <div class="flex justify-between py-2 border-t bg-gray-50 px-2 -mx-2">
                    <span class="font-semibold">Total Assets</span>
                    <span class="font-bold">$${data.total_assets.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        <div class="mb-4">
            <h4 class="text-sm font-semibold text-gray-500 uppercase mb-2">Liabilities</h4>
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-700">Accounts Payable</span>
                    <span class="font-semibold">$${data.accounts_payable.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        <div>
            <h4 class="text-sm font-semibold text-gray-500 uppercase mb-2">Equity</h4>
            <div class="space-y-2">
                <div class="flex justify-between py-2 border-t bg-gray-50 px-2 -mx-2">
                    <span class="font-semibold">Total Equity</span>
                    <span class="font-bold">$${data.total_equity.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        ${data.is_balanced ? `
            <div class="mt-4 text-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    ✓ Books Balanced
                </span>
            </div>
        ` : ''}
    `;
}

function displayCapabilities(capabilities) {
    const grid = document.getElementById('capabilities-grid');
    
    grid.innerHTML = capabilities.map(category => `
        <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-900">${category.category}</h3>
            <ul class="space-y-2">
                ${category.capabilities.map(cap => `
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2">✓</span>
                        <span class="text-gray-700">${cap}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

function displayDisclaimer(disclaimer) {
    document.getElementById('disclaimer').textContent = disclaimer;
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Load data on page load
loadData();
