    const activityLog = [];
    const THRESHOLD = 15; 
    const stats = { click: 0, keydown: 0 };
    
    const interactionArea = document.getElementById('interaction-area');
    const logContainer = document.getElementById('log-container');
    const warningBox = document.getElementById('warning-box');

   
    function logActivity(event, phase) {
        const entry = {
            timestamp: new Date().toLocaleTimeString(),
            type: event.type,
            target: event.target.tagName + (event.target.id ? `#${event.target.id}` : ''),
            phase: phase,
            key: event.key || null
        };

        activityLog.push(entry);

        if (stats[event.type] !== undefined) {
            stats[event.type]++;
            if (stats[event.type] > THRESHOLD) {
                triggerWarning(event.type);
            }
        }

        updateUI(entry);
    }

    interactionArea.addEventListener('click', (e) => logActivity(e, 'Capturing'), true);
    interactionArea.addEventListener('keydown', (e) => logActivity(e, 'Capturing'), true);
    interactionArea.addEventListener('focus', (e) => logActivity(e, 'Capturing'), true);

    interactionArea.addEventListener('click', (e) => logActivity(e, 'Bubbling'), false);
    interactionArea.addEventListener('keydown', (e) => logActivity(e, 'Bubbling'), false);
    interactionArea.addEventListener('blur', (e) => logActivity(e, 'Bubbling'), false);

    function updateUI(entry) {
        const div = document.createElement('div');
        div.className = 'log-entry';
        const phaseClass = entry.phase.toLowerCase();
        
        div.innerHTML = `
            <span style="color: #666">[${entry.timestamp}]</span> 
            <strong>${entry.type.toUpperCase()}</strong> 
            on <span style="color: #d35400">${entry.target}</span> 
            <span class="${phaseClass}">(${entry.phase})</span>
            ${entry.key ? ` - Key: "${entry.key}"` : ''}
        `;
        
        logContainer.prepend(div);
    }

    function triggerWarning(type) {
        warningBox.style.display = 'block';
        warningBox.innerText = `⚠️ SUSPICIOUS ACTIVITY: High frequency of "${type}" events detected!`;
    }

    function exportLog() {
        if (activityLog.length === 0) return alert("No logs to export!");

        const header = "TIMESTAMP | EVENT | TARGET | PHASE | DATA\n" + "=".repeat(50) + "\n";
        const body = activityLog.map(log => 
            `${log.timestamp} | ${log.type.padEnd(8)} | ${log.target.padEnd(12)} | ${log.phase.padEnd(10)} | ${log.key || ''}`
        ).join('\n');

        const blob = new Blob([header + body], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = `UserActivity_${new Date().getTime()}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    }

    function resetLog() {
        if (confirm("Clear all logged data?")) {
            activityLog.length = 0;
            stats.click = 0;
            stats.keydown = 0;
            logContainer.innerHTML = '';
            warningBox.style.display = 'none';
        }
    }