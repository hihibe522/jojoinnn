 <template>
 <div>
  <navbar></navbar>
  <chatroom></chatroom>
  <router-view></router-view>
  <!-- <div class="container-fluid">
    <div class="row">

      <sidebar></sidebar>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </main>
    </div>
  </div> -->
  <bgcanvas></bgcanvas>
</div>
</template>

<script>
// import navbar from './navbar';
// import sidebar from './sidebar';
// import alertmsg from './alertMsg';
import navbar from './Vue_navBar'
import bgcanvas from './StarBgCanvas';
import chatroom from './chatRoom';

export default {
  components:{
    navbar,
    bgcanvas,
    chatroom,
  }
}
</script>
