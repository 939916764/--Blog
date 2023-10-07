<template>
  <div ref="formDom">
    <el-dialog v-model="dialogFormVisible" title="Authorization" :close-on-click-modal="false" :center="true" width="440">
      <el-form :model="form" ref="ruleFormRef" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="form.account" autocomplete="off" />
          <div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">

              <span class="letter" v-for="item in Username">{{ item }}</span>
            </span>
          </div>
          <div class="styled-input__circle"></div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" autocomplete="off" type="password" show-password />
          <div class="styled-input__placeholder"> <span class="styled-input__placeholder-text">
              <span class="letter" v-for="item in Password">{{ item }}</span></span>
          </div>
          <div class="styled-input__circle"></div>
        </el-form-item>
      </el-form>
      <button type="button" class="styled-button" @click="submit(ruleFormRef)">
        <span class="styled-button__real-text-holder">
          <span class="styled-button__real-text">Submit</span>
          <span class="styled-button__moving-block face">
            <span class="styled-button__text-holder">
              <span class="styled-button__text">Submit</span>
            </span>
          </span>
          <span class="styled-button__moving-block back">
            <span class="styled-button__text-holder">
              <span class="styled-button__text">Submit</span>
            </span>
          </span>
        </span>
      </button>

    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElDialog, ElForm, ElInput, ElFormItem, FormInstance, FormRules, ElMessage } from 'element-plus'
import { reactive, ref, nextTick } from 'vue'
import { LoginApi } from "@/api/index"
import { useRouter } from 'vue-router';

const Username = ref(['U', 's', 'e', 'r', 'n', 'a', 'm', 'e'])
const Password = ref(['P', 'a', 's', 's', 'w', 'o', 'r', 'd'])
const dialogFormVisible = ref(false)
const formDom = ref();
const form = reactive({
  account: '',
  password: '',

})
const ruleFormRef = ref<FormInstance>()
const router = useRouter();

const rules = reactive<FormRules>({
  account: [{ required: true, message: 'Please input Username', trigger: 'blur' },],
  password: [{ required: true, message: 'Please input Password', trigger: 'blur' },],
})
// 打开关闭
const toggle = () => {
  dialogFormVisible.value = !dialogFormVisible.value
  textJump()
}

const submit = (formEl: FormInstance | undefined) => {


  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      LoginApi.login(form).then(res => {
        if (res.code === 0) {
          ElMessage.error(res.message)
        } else {
          dialogFormVisible.value = !dialogFormVisible.value
          sessionStorage.setItem('token', res.tokenStr)
          router.push('/admin')
          ElMessage.success(res.message)
        }
      })
    } else {
      console.log('error submit!')
    }
  })
}
const textJump = () => {
  nextTick(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function (el) {
      var parent: any = el!.parentNode!.parentNode!.parentNode;
      el.addEventListener('focus', function () {
        parent!.classList.add('filled');
        placeholderAnimationIn(parent, true);
      }, false);
      el.addEventListener('blur', function () {
        if (el.value.length) return;
        parent!.classList.remove('filled');
        placeholderAnimationIn(parent, false);
      }, false);
    });
  })
}

function placeholderAnimationIn(parent: any, action: boolean) {
  var act = action ? 'add' : 'remove';
  var letters: any = parent.querySelectorAll('.letter');
  letters = [].slice.call(letters, 0);
  if (!action) letters = letters.reverse();
  letters.forEach(function (el: { classList: { [x: string]: (arg0: string) => void; }; }, i: number) {
    setTimeout(function () {
      var contains = parent.classList.contains('filled');
      if (action && !contains || !action && contains) return;
      el.classList[act]('active');
    }, 50 * i);
  });
}


// 暴露给父组件
defineExpose({ toggle });

</script>

<style lang="less" scoped>
.el-form {
  /deep/ .el-form-item__content {

    width: 100%;
    position: relative;
    margin-bottom: 25px;


    border: 1px solid rgba(113, 83, 52, 0.6);
    border-radius: 3px;
    -webkit-transition: all 0.3s ease;

    &:hover {
      border-color: rgba(113, 83, 52, 1);
    }

    &.filled {
      border-color: rgba(113, 83, 52, 0.6);
    }

    &.filled .styled-input__circle:after {
      -webkit-transform: scale(37);
      transform: scale(37);
      opacity: 0;
    }
  }

  /deep/.el-form-item__error {

    font-size: 14px;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    top: 60px;
    left: 0px;
  }
}

.styled-button {
  -webkit-appearance: none;
  -webkit-user-select: none;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  padding: 20px;
  outline: none;
  background: none;
  position: relative;
  color: #000;
  border-radius: 3px;
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: #715334;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  overflow: hidden;
}

.styled-button__real-text-holder {
  position: relative;
}

.styled-button__real-text {
  color: transparent;
  display: inline-block;
}

.styled-button__text-holder {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.styled-button__moving-block {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.styled-button__moving-block.back {
  color: white;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.styled-button__moving-block.back .styled-button__text-holder {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.styled-button:hover,
.styled-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #ffcf60;
}

.styled-button:hover .face,
.styled-button:active .face {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.styled-button:hover .face .styled-button__text-holder,
.styled-button:active .face .styled-button__text-holder {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.styled-button:hover .back,
.styled-button:active .back {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.styled-button:hover .back .styled-button__text-holder,
.styled-button:active .back .styled-button__text-holder {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.styled-button:active {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}


.styled-input__circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  border-radius: 3px;
}

.styled-input__circle:after {
  content: '';
  position: absolute;
  left: 16.5px;
  top: 19px;
  height: 14px;
  width: 14px;
  z-index: -2;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0);
  -webkit-transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: transform 0.6s ease, opacity 1s ease;
  transition: transform 0.6s ease, opacity 1s ease, -webkit-transform 0.6s ease;
}

.el-input {

  /deep/ .el-input__wrapper {
    background: none;
    box-shadow: none;


    .el-input__inner {
      width: 100%;
      -webkit-appearance: none;
      font-size: 14px;
      outline: none;

      color: #fff;
      border: none;
      height: 52px;
      font-weight: 600;
      letter-spacing: 0.035em;
    }
  }


}


.styled-input__placeholder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: white;
  pointer-events: none;

  /deep/ .styled-input__placeholder-text .letter {
    display: inline-block;
    vertical-align: middle;
    position: relative;

    animation: letterAnimOut 0.25s ease forwards;
    text-shadow: 0 0 5px;
  }

  /deep/.styled-input__placeholder-text .letter.active {

    animation: letterAnimIn 0.25s ease forwards;
  }
}






@keyframes letterAnimIn {
  0% {
    transform: translate(30px, 0);
  }

  25% {
    transform: translate(30px, 10px);
    color: red;
  }

  45% {
    transform: translate(30px, 10px);
    opacity: 0;
    color: red;
  }

  55% {
    transform: translate(20px, 10px);
    opacity: 0;
  }

  56% {
    transform: translate(20px, -27px);
    opacity: 0;
    color: #00ff6b;
  }

  76% {
    color: #00ff6b;
    opacity: 1;
    transform: translate(0px, -27px);
  }

  100% {
    transform: translate(0px, -27px);
    opacity: 1;
  }
}



@keyframes letterAnimOut {
  0% {
    transform: translate(-30px, -27px);
    opacity: 1;
  }

  25% {
    transform: translate(-30px, -40px);
    opacity: 0;
  }

  45% {
    transform: translate(0, 10px);
    opacity: 0;
  }

  55% {
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }

  56% {
    transform: translate(0, 10px);
    color: red;
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>