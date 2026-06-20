const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('app.js', 'utf8');
try {
  new vm.Script(code);
  console.log('OK');
} catch(e) {
  console.error('Error:', e.message);
  // Find the line number by counting chars
  const pos = e.pos || 0;
  if (pos) {
    const lines = code.substring(0, pos).split('\n');
    console.error('Line:', lines.length);
    console.error('Context:', code.substring(Math.max(0,pos-100), pos+100));
  } else {
    // Grep for unusual ))
    const lines = code.split('\n');
    lines.forEach((l,i) => {
      if (l.includes('))') && !l.includes('//') && (l.trim().startsWith('if') || l.includes('filter') || l.includes('map'))) {
        console.log(`Line ${i+1}: ${l.trim().substring(0,120)}`);
      }
    });
  }
}
