 <template>
 <div>
  <navbar></navbar>
  <chatroom></chatroom>
  
  <router-view></router-view>

  <bgcanvas></bgcanvas>
  <vfooter></vfooter>
</div>
</template>

<script>
// import navbar from './navbar';
// import sidebar from './sidebar';
// import alertmsg from './alertMsg';
import navbar from './Vue_navBar'
import bgcanvas from './StarBgCanvas';
import chatroom from './chatRoom';
import vfooter from './Footer';

export default {
  components:{
    navbar,
    bgcanvas,
    chatroom,
    vfooter
  }
}
</script>
