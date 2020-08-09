 <template>
 <div>
  <navbar></navbar>
  <chatroom></chatroom>
  
  <router-view></router-view>

  <bgcanvas></bgcanvas>
  <vfooter  v-show="$route.name!=='actLocations'"></vfooter>
</div>
</template>

<script>
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
