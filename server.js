import app from './app.js'
import { port } from './config/index.js'

app.listen(port, async () => {
    try {
        console.log(`Server is running on http://localhost:${port}`);

    } catch (error) {
        console.log(`Error starting Server: ${error.message}`);
    }
})

