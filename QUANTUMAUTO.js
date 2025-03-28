const { exec } = require('child_process');

// Ambil argumen dari command line
const args = process.argv.slice(2);
const host = args[0] || "example.com";
const time = parseInt(args[1]) || 120;
const thread = args[2] || 100;
const rate = args[3] || 1000;
const proxyFile = args[4] || "proxy.txt";

let elapsedTime = 0; // Waktu berjalan

function runScript() {
    if (elapsedTime >= time) {
        console.log(`Waktu ${time} detik sudah habis. Skrip berhenti.`);
        return; // Hentikan skrip
    }

    console.log(`Menjalankan QUANTUM1.js untuk ${host} (Elapsed: ${elapsedTime}/${time} detik)...`);

    const command = `node QUANTUM1.js ${host} ${Math.min(60, time - elapsedTime)} ${thread} ${rate} ${proxyFile}`;
    const process = exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Terjadi kesalahan: ${error.message}`);
        }
        if (stderr) {
            console.error(`Error Output: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
    });

    // Hitung waktu sisa
    const interval = Math.min(60, time - elapsedTime);

    // Hentikan proses setelah interval
    setTimeout(() => {
        console.log(`Menghentikan QUANTUM1.js setelah ${interval} detik...`);
        process.kill();
        elapsedTime += interval;

        if (elapsedTime < time) {
            console.log(`Restart dalam 60 detik... (Elapsed: ${elapsedTime}/${time})`);
            setTimeout(runScript, 60000);
        } else {
            console.log(`Waktu ${time} detik sudah habis. Skrip berhenti.`);
        }
    }, interval * 1000);
}

runScript();
