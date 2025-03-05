let backendUrl;
export let url: string = ''
export let imageURl: string = '';


if (process.env.NODE_ENV === "production") {
    // imageURl = 'https://police-fraud-backend.vercel.app/';
    // imageURl = 'https://police-fraud-backend.onrender.com/';
    imageURl = 'https://srv719145.hstgr.cloud/';
    backendUrl = imageURl + 'api/';
    url = 'https://citties.vercel.app/'
    url = 'https://backend.cittis.co/'
} else {
    imageURl = 'http://localhost:9000/';
    imageURl = 'https://srv719145.hstgr.cloud/';
    // imageURl = 'https://backend.cittis.co/';
    backendUrl = imageURl + 'api/';
    url = 'http://localhost:3000/'
}
export const adminUrl = `${backendUrl}`
