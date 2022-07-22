export default async function fetchWithInterval(call: any) {
    let count = 0;

    return await new Promise((resolve, reject) => {

        const interval = setInterval(() => {

            if (count < 5) {

                call()
                    .then(async (response: any) => {
                        try {
                            const data = await response.json();
                            return data;

                        } catch (err) {
                            //no need to be parsed, just return server response
                            return response;
                        }
                    })
                    .then((data: any) => {
                        clearInterval(interval);
                        resolve(data);
                    })
                    .catch((err: any) => {
                        count++;
                        console.log(`Catch fetchWithInterval, take number ${count}`, err);
                    });

            } else {
                reject("fetch failed 5 times");
                clearInterval(interval);
            }

        }, 900);

    });
} 
