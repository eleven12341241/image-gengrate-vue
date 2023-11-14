<template>
  <el-form label-width="120px" v-loading="loading">
    <el-form-item label="文字">
      <el-input v-model="text" type="text" placeholder="请输入文字" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="imageGengrate">生成</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
    <el-form-item>
      <el-image :src="imageUrl"  style="width: 300px; height: 300px">
        <template #error>
          <div class="image-slot">
            <el-icon><icon-picture /></el-icon>
          </div>
        </template>
      </el-image>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { ref } from "vue";
import { ElInput, ElButton, ElMessage } from "element-plus";
</script>

<script setup lang="ts">
const loading = ref(false);
const text = ref("");
const imageUrl = ref("");

const imageGengrate = async () => {
  if (!text.value) {
    ElMessage({
      message: "请输入文字",
      type: "warning",
    });
    return;
  }
  const apiUrl = "/image";
  try {
    loading.value = true;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text.value }),
    });

    if (response.ok) {
      const data = await response.json();
      imageUrl.value = data.imageUrl;
    } else {
      console.error("Error fetching speech");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  loading.value = false;
};

const cancel = () => {
  text.value = "";
};
</script>

<style>
/* 添加一些基本的样式 */
textarea {
  width: 300px;
  height: 100px;
}

button {
  margin-top: 10px;
}
</style>
