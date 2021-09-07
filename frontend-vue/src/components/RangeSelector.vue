<template>
  <div class="range">
    <div class="radio left" @mousemove="onDrag" @mousedown="onClick" @mouseup="onClickEnd" @mouseleave="onClickEnd">
      <i class="gg-chevron-right"></i>
    </div>
    <div class="radio right" @mousemove="onDrag" @mousedown="onClick" @mouseup="onClickEnd" @mouseleave="onClickEnd">
      <i class="gg-chevron-left"></i>
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    let dragging = false;

    function getRelativePos(event) {
      return event.clientX - event.target.parentElement.offsetLeft;
    }

    function onDrag(event) {
      if (dragging) {
        let transformPos  = event.target.style.transform.match(/-?\d+/);
        transformPos = transformPos ? parseInt(transformPos[0]) : 0;
        transformPos += (event.offsetX - 15);

        // Collisions
        let relativePos = getRelativePos(event);
        if (relativePos < 0 || relativePos > 200) transformPos = 0;

        //let id = [...event.target.parentNode.children].indexOf(event.target);
        
        event.target.style.transform = `translateX(${transformPos}px)`;
      }
    }

    function onClick(event) {
      dragging = true;
      onDrag(event);
    }

    function onClickEnd() {
      dragging = false;
    }

    return {
      onDrag,
      onClick,
      onClickEnd
    }
  }
}
</script>


<style lang="scss" scoped>

.range {
  width: 200px;
  height: 5px;
  background-color: red;
  border-radius: $border-radius;
  margin: 5px;
  position: relative;

  .radio {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $white;
    position: absolute;
    top: -15px;
    left: -15px;
    box-shadow: 0px 0px 21px -4px #000000;
    display: flex;
    cursor: pointer;

    i {
      margin: auto;
      pointer-events: none;
    }

    &.right {
      left: unset;
      right: -15px;
      top: -15px;
    }
    
  }
}
</style>