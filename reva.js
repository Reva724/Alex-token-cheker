
    let button = document.getElementById('check');
    button.addEventListener('click', function() {
    async function check(id) {
        let tokens = document.querySelector(`#${id}`).value.split('\n');
        for (let i = 0; i < tokens.length; i++) { 
            let c = await IsValidToken(tokens[i]);
            if (c == 'c') {
                console.log('Cloudflare has likely banned your IP.');
            } else if (c) {
                add(`Valid | ${tokens[i]}`);
            } else {
                add(`Invalid | ${tokens[i]}`);
            }
        await sleep(300); 
        }
    }

    function add(text) { 
        document.querySelector('#valid').value += text + "\n";
    }

    function sleep(ms) { 
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    

    function IsValidToken(token) {
        return new Promise(async resolve => {  
            let res;
            try {
                res = await fetch('https://discord.com/api/v8/users/@me', {
                    headers: { 
                        authorization: token
                    }
                }); 
            } catch {
                resolve(false);
            }
            let json;
            try {
                json = await res.json();
            } catch (err) { 
                resolve('c');
            }
            if (json.username) { 
                resolve(true);
            } else { 
                resolve(false); 
            }
        });
    }

    document.querySelector('#check').addEventListener('click', function() {
        check('tokens');
    });
  })
