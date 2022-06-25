const resFn = () => new Promise((resolve) => { setTimeout(() => resolve(1), 1000) })

Promise.all([resFn(), resFn(), resFn()]).then(res => console.log(res))