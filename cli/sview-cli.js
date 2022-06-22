const args = process.argv.slice(2)
const fs = require('fs')
const path = require('path')

/** @type {import('ora').Ora} */
let spinner = null
import('ora').then((oraD) => {
    const ora = oraD.default
    const name = args[1]

    spinner = ora('开始创建...')
    spinner.start();

    switch (args[0]) {
        case 'c':
            setTimeout(() => {
                const is = createComponent(name)
                if (is !== false) setTimeout(() => spinner.succeed(`s-${args[1]} 组件创建成功！`), 1000)
            }, 500)
            break;
        default:
            spinner.fail(`请输入要执行的命令`)
            break;
    }

})

/** 创建 ui组件 */
function createComponent(name) {
    const _path = './components'

    const exitsCom = fs.existsSync(`${_path}/${name}`)
    if (exitsCom) {
        spinner.fail('组件存在，请比对删除后重试。')
        return false
    }

    spinner.text = '生成目录中...'
    mkdirsSync(path.resolve(`${_path}/${name}`))
    spinner.succeed(`组件目录生成完毕！`)

    const upName = name.replace(/\w?/, (str) => str.toUpperCase())

    const vueTemplate = `<template>\n\t<view class="s-${name}" :style="${name}Style">\n\n\t</view>\n</template>\n<script lang="ts" setup>\nimport { computed, CSSProperties } from "vue";\ninterface Props {\n}\nconst props = defineProps<Props>();\nconst ${name}Style = computed<CSSProperties>(() => ({\n}));\n</script>\n<style lang="scss" scoped>\n.s-${name} {\n\twidth: 100%;\n}\n</style>`
    const vuePath = `${_path}/${name}/s${upName}.vue`
    fs.writeFileSync(path.resolve(vuePath), vueTemplate, 'utf8')

    const indexPath = fs.readFileSync(path.resolve(__dirname, './components-template.js'), { encoding: 'utf-8' })
    fs.writeFileSync(path.resolve(`${_path}/${name}/index.ts`), indexPath.replace(/\$/g, upName), 'utf8')

    const comIndexPath = fs.readFileSync(path.resolve(__dirname, '../components/index.ts'), { encoding: 'utf-8' })
    fs.writeFileSync(path.resolve(`${_path}/index.ts`), comIndexPath + `\nexport * from './${name}'`, 'utf8')

    setTimeout(() => spinner.succeed(`${vuePath} 创建成功！`), 400)
}


function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


