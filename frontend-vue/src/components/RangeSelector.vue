<template>
  <div class="range" ref="range">
    <div class="range-selected"></div>
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
  props: ['min', 'max'],
  setup(props, ctx) {
    let dragging = false;
    let radiosPos = [];
    let selectedRadio = 0;

    function getRelativePos(event) {
      return event.clientX - event.target.parentElement.offsetLeft;
    }

    function getTransform(element) {
      let transformPos  = element.style.transform.match(/-?\d+/);
      transformPos = transformPos ? parseInt(transformPos[0]) : 0;
      return transformPos;
    }

    function onDrag(event) {
      if (dragging) {
        let transformPos = getTransform(event.target);

        // Collisions
        let relativePos = getRelativePos(event);
        if (relativePos >= 0 && relativePos <= 200) {
          let move = true;
          radiosPos.forEach(rp => {
            if (relativePos > (rp-50) && relativePos < (rp+50)) {
              move = false;
            }
          });
          if (move) {
            transformPos += (event.offsetX - 15);
            event.target.style.transform = `translateX(${transformPos}px)`;
            ctx.emit('update:radio' + selectedRadio, parseInt(relativePos/200*props.max));

            let rangeSelected = event.target.parentNode.children[0];
            if (selectedRadio == 1) {
              rangeSelected.style.transform = `translateX(${transformPos}px)`;
              rangeSelected.style.width = `${radiosPos[0]-transformPos}px`;
            } else if (selectedRadio == 2) {
              rangeSelected.style.width = `${200+transformPos-radiosPos[0]}px`;
            }
          }
        }
      }
    }

    function onClick(event) {
      radiosPos = [...event.target.parentNode.children].filter(r => r != event.target && r.classList.contains('radio')).map(r => r.offsetLeft +15 + getTransform(r));
      dragging = true;
      selectedRadio = [...event.target.parentNode.children].filter(r => r.classList.contains('radio')).indexOf(event.target)+1;
      onDrag(event);
    }

    function onClickEnd() {
      dragging = false;
      ctx.emit('onapply');
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
  background-color: rgb(223, 223, 223);
  border-radius: $border-radius;
  margin: 5px;
  position: relative;

  .range-selected {
    background-color: red;
    border-radius: $border-radius;
    position: absolute;
    width: 200px;
    height: 5px;
  }

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