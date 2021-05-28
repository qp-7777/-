<template>
  <div
    class="account"
    v-loading="loading"
    element-loading-text="正则拼命计算中"
  >
    <input type="file" @change="readFile" accept=".xls,.xlsx" />
    <div class="peopleList" v-if="NewExcelData">
      <div v-for="(item, i) in NewExcelData" :key="i">
        <span> 工号:{{ item["工号"] }} </span>
        <span> 员工姓名:{{ item["员工姓名"] }} </span>
        <span> 出勤天数:{{ item["考勤"].length }} </span>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其它文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》from ‘《组件路径》';
import XLSX from "xlsx";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      ExcelData: null, //表格数据
      NewExcelData: null, //处理后的表格数据
      loading: false,
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中数据变化
  watch: {},
  //方法集合
  methods: {
    readFile(e) {
      const files = e.target.files;
      //如果没有文件名
      if (files.length <= 0) {
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        console.log("文件传格式不正确");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          this.loading = true;

          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          this.ExcelData = ws;
          this.NewExcelData = this.changeExcelData(this.ExcelData);
          this.loading = false;
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
    // 名字相同的放到同一个 键下
    changeExcelData(data) {
      let newArr = [];
      data.forEach((item) => {
        if (item["工号"]) {
          newArr.push({
            工号: item["工号"],
            员工姓名: item["员工姓名"],
          });
          return false;
        }
      });
      newArr = this.distinct3(newArr, "工号");
      // 给每个人添加考勤
      newArr.forEach((peo) => {
        peo["考勤"] = [];
        data.forEach((item) => {
          if (item["工号"] == peo["工号"]) {
            if (item["汇总"] != 0) {
              peo["考勤"].push(item);
            }
          }
        });
      });
      return newArr;
    },
    // 去重
    distinct3(arr, key) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i][key] === arr[j][key]) {
            arr.splice(j, 1);
            j = j - 1;
          }
        }
      }
      return arr;
    },
    // 计算薪资
    CalculateSalary() {
      // 根据不同政策计算每个人的薪资
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //生命周期-创建之前
  beforeCreated() {},
  //生命周期-挂载之前
  beforeMount() {},
  //生命周期-更新之前
  beforUpdate() {},
  //生命周期-更新之后
  updated() {},
  //生命周期-销毁之前
  beforeDestory() {},
  //生命周期-销毁完成
  destoryed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {},
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.account {
  width: 100%;
  height: 100%;
}
.peopleList > div {
  margin: 30px;

}
.peopleList > div span{
  display: inline-block;
  width: 150px;
  margin-left: 10px;
}
</style>