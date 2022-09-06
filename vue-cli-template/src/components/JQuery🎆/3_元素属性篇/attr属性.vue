<template>
    <div>
        <a href="http://www.baidu.com">点击一下</a>
    </div>
</template>

<script>
    import $ from "jquery"

    export default {
        name: "attr属性",
        mounted() {
            //1.查看img属性
            console.log($('a').attr("href"))

            //2.键值对的形式设置属性值
            $('a').attr("href", "http://www.qq.com")
        }
    }
</script>

<style scoped>

</style>