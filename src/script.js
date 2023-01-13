var temporary_mass = 0;
var summ_of_mass= 0;
var arr_time = new Array();
var time_average = 0;
var acceleration = 0;
var box = document.getElementById("mass_left");
var box2 = document.getElementById("mass_right");

var left = document.getElementById("thread_left");
var right = document.getElementById("thread_right");
var wheels = document.getElementById("wheel");
var rotate, b1, b2, c1, c2;

const ChangeHandler = e =>{
     const value = e.value;
     e.value = e.value.replace(/[^0-9\.\,]/g, '');

}
const btns = document.querySelectorAll('.btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');

btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

modalOverlay.addEventListener('click', (e) => {
	console.log(e.target);

	if (e.target == modalOverlay) {
		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});
	}
});
const mass_right_position = document.getElementById("mass_right").offsetTop;
const mass_left_position = document.getElementById("mass_left").offsetTop;

document.getElementById('time1').readOnly = true;
document.getElementById('time2').readOnly = true;
document.getElementById('time3').readOnly = true;
document.getElementById('time4').readOnly = true;
document.getElementById('time5').readOnly = true;

document.getElementById('button_take_away').disabled = true;
document.getElementById('button_add').disabled = true;

class Buttons{
    button_start = document.getElementById("button_start");
    button_reset = document.getElementById("button_reset");
}

var thread_left = document.getElementById("thread_left");
var thread_right = document.getElementById("thread_right");

button_start.addEventListener("click", (e) => {
    calculate();
});


button_reset.addEventListener("click", (e) => {
  reset();
});


button_add.addEventListener("click", (e) => {
   add_mass();
});


button_take_away.addEventListener("click", (e) => {
   add_mass2();
});


button_lab1.addEventListener("click", (e) => {
   if (document.getElementById("masa2").value <= 0 || document.getElementById("masa1").value <=0){
      alert("Введите массу");
   }
   if (document.getElementById("height").value <= 0){
      alert("Введите высоту");
   }
   document.getElementById('delta').readOnly = true;
});


button_lab2.addEventListener("click", (e) => {
   if (document.getElementById("masa1").value <= 0){
      alert("введите массу");
   }
   if(document.getElementById("delta").value <=0){
         alert("Введите разность масс");
   }
   if (document.getElementById("height").value <= 0){
         alert("Введите высоту");
   }
   document.getElementById('masa2').readOnly = true;
   temporary_mass = parseFloat(document.getElementById('masa1').value);

});

button_move.addEventListener("click", (e) => {
   this.animate = animate();

});

var k = 2;
function add_mass(){
        let deltya  = document.getElementById('delta').value;
        let delt = parseFloat(deltya);
        document.getElementById("masa1").value = (temporary_mass*k);
         if (acceleration != 0){
                   mass_right.style.top = mass_right_position + "px";
                   mass_left.style.top = mass_left_position + "px";
                   thread_left.style.height = 400 + "px";
                   thread_right.style.height = 400 + "px";

         }
        calculate();
        k++;
}
var k2 = 2;
var deltya = 0;
function add_mass2(){
        t_1mass=parseFloat(document.getElementById('masa1').value);
        t_2mass=parseFloat(document.getElementById('masa2').value);
        del = parseFloat(document.getElementById('delta').value);
        if (t_1mass-del/k2 > 0){
              deltya  = 0.1*(t_1mass + t_2mass);
              document.getElementById('masa1').value = round(parseFloat(t_1mass - deltya),2);
              document.getElementById('masa2').value = round(parseFloat(t_2mass + deltya),2);
              document.getElementById('delta').value = round(Math.abs(parseFloat(document.getElementById('masa2').value) - parseFloat(document.getElementById('masa1').value)),2) ;
              if (acceleration != 0){
                   mass_right.style.top = mass_right_position + "px";
                   mass_left.style.top = mass_left_position + "px";
                   thread_left.style.height = 400 + "px";
                   thread_right.style.height = 400 + "px";
              }
              calculate();
              k2++;

        }
        else{
            alert("Масса будет равна нулю");
        }
}


function reset() {
    location.reload();
    this.reset = reset;
}

function calculate(){
      let h = parseFloat(document.getElementById("height").value);
      let g = parseFloat(document.getElementById("gravedad").value);
      let m1 = parseFloat(document.getElementById("masa1").value);
      if(document.getElementById('masa2').readOnly == true){

              document.getElementById('button_add').disabled = false;
              let delt = parseFloat(document.getElementById('delta').value);
              let m2 = parseFloat(document.getElementById('masa2').value = m1+delt);
              if (check() == true){
                    return;
              }
              else{
                     formulas(m1,m2,delt,h,g);

              }

      }


      if(document.getElementById('delta').readOnly == true){
                document.getElementById('button_start').disabled = true;
                document.getElementById('button_take_away').disabled = false;
                let m2 = parseFloat(document.getElementById('masa2').value);
                let delta = Math.abs(parseFloat(document.getElementById('delta').value));
                let m1 = parseFloat(document.getElementById('masa1').value);

                if (check() == true){
                         return;
                }
                else{
                       formulas(m1,m2,delta, h,g);

                }
      }
}



function check(){
    if (document.getElementById('masa2').value == document.getElementById('masa1').value){
           time_average = "Infinity";
           document.getElementById('time1').value = time_average;
           document.getElementById('time2').value = time_average;
           document.getElementById('time3').value = time_average;
           document.getElementById('time4').value = time_average;
           document.getElementById('time5').value = time_average;
           return true;
    }
    return false;

}


function formulas(m1,m2,delta,h,g){
         let arr_time = new Array();

         let sum_mass = parseFloat(m1+m2)*0.001;
         let minus_mass = parseFloat(m2-m1)*0.001;
         let part_1 = sum_mass*2*h;
         let part_2 = Math.abs(minus_mass)*g*0.95;

         time_average = Math.sqrt(part_1/part_2);
         time_average = round(time_average, 3);

         if(isNaN(time_average)){time_average = 0;}

         for (let i = 0; i<=4; i ++){
                arr_time.push(getRandomNum(time_average - 0.02, time_average + 0.01));
         }
         document.getElementById('time1').value = round(arr_time[0],3);
         document.getElementById('time2').value = round(arr_time[1],3);
         document.getElementById('time3').value = round(arr_time[4],3);
         document.getElementById('time4').value = round(arr_time[2],3);
         document.getElementById('time5').value = round(arr_time[3],3);


}

function animate(){

        let m2 = parseFloat(document.getElementById('masa2').value);
        let m1 = parseFloat(document.getElementById('masa1').value);
        if (m1 == 0){
          alert("Масса равна нулю");

        }
        else{

        let h = parseFloat(document.getElementById('height').value);
        let r = 6.3*0.01;
        acceleration = (2*h)/((time_average)*(time_average));
        let angular_acceleration = acceleration/r;
		if(m1 > m2){
			rotate = "rotate("+angular_acceleration+"deg)";
			b1 = "80%";
			b2 = "40%";
			c1 = "485px";
			c2 = "145px";
		} else if(m1 < m2){
			rotate = "rotate("+angular_acceleration+"deg)";
			b1 = "40%";
			b2 = "80%";
			c1 = "145px";
			c2 = "485px";
		}

		wheels.style.transition = "2s";
		wheels.style.transform = rotate;

		mass_left.style.transition = "2s"
		mass_left.style.top = b1;

		mass_right.style.transition = "2s"
		mass_right.style.top = b2;

		left.style.transition = "2s"
		left.style.height = c1;

		right.style.transition = "2s"
		right.style.height = c2;
		
        }
}

function round(number, digits) {
    return Number(Math.round(number +'e'+ digits) +'e-'+ digits);
}


function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

