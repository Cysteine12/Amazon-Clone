<template>
    <Header header="Profile" />
    <h1 class="p-1 px-2">Profile</h1>
    <div class="body-bg-color dashboard" id="profile">
      <section v-if="user !== []" id="profile_sec1">
        <div v-for="user in user" :key="user.email" id="sec1_div">
            <img src="https://helixcoders.files.wordpress.com/2020/09/qi-bin-w4hbafegiac-unsplash.jpg" alt="Profile pics" name="p_pics"/>
            <br>
            <hr/>
            <h3 style="text-align:center; padding-left:0;">PROFILE DETAILS</h3>
            <hr/>
            <div class="tr">
                <div class="td">Name </div>
                <div class="td">{{ user.name }}</div>
            </div>
            <div class="tr">
                <div class="td">Email Address: </div>
                <div class="td">{{ user.email}}</div>
            </div>
            <div class="tr">
                <div class="td">Status: </div>
                <div class="td">Active</div>
            </div>
            <div class="tr">
                <div class="td">Member since: </div>
                <div class="td">{{ user.createdAt }}</div>
            </div>
            <button class="alert-success" style="padding:7px;border-radius:5px">Edit Profile</button>
            <button class="alert-error" style="padding:7px;border-radius:5px;display:inline;float:right;">Delete Account</button>
            <br/>	
          </div>
			</section>
      <div v-else>
        {{ authCheck.status }}
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
 name: 'Profile',
  components: {
    Header
  },
  setup() {
    const store = useStore()
    const user = ref([])
    const authCheck = ref({
      status: '',
      err: ''
    })


    onMounted(async () => {
      await store.dispatch('getProfile')

      authCheck.value.status = await store.getters.authState
      user.value.push(await store.getters.user)
    })

    return {
      authCheck,
      user,
    }
  }
}
</script>

<style scoped>
.dashboard {
  margin: auto;
  max-width: 1000px;
}

#profile{
  margin: 0;
  width: auto;
  padding: 25px 5px 30px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
  
#profile_sec1{
  background: #fff;
  max-width: 500px;
  border-radius: 5px;
  box-shadow: -.5px -.5px .5px #939393;
  padding: 10px 10px 20px 10px;
  display: flex;
  align-items: center;
}
  
  
#profile_sec1 #sec1_div{
  margin: 10px;
  width: 100%;
  padding: 20px 20px;
  border: 5px outset #4f5ddb;
  border-radius: 10px;
  max-width: 500px;
}
  
  
#profile_sec1 #sec1_div img{
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 5px solid #4f5ddb;
  display: flex;
  margin: 0 auto;
}
  
#profile_sec1 #sec1_div hr{
  height: 10px;
  background: #4f5ddb;
}
  
.tr{
  padding: 20px 0;
  margin: 0;
  display: inline-block;
  width: 100%;
}
  
.td{
  padding: 40px 0 40px 0;
  display: inline;
  width: 100%;
  text-align: center;
}
  
.td:first-child{
  width: 25%;
  font-size: 16px;
  font-weight: 700;
  color: #c2239c;
}


</style>