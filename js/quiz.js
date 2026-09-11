const qs = [
  ["Animation คืออะไร",
   "การทำให้ภาพต่อเนื่องดูเหมือนเคลื่อนไหว",
   "ภาพนิ่งภาพเดียว",
   "การบันทึกเสียง",
   "การพิมพ์", 0],

  ["Generative AI ทำอะไรได้",
   "สร้างข้อความ/ภาพ/เสียง/วิดีโอจากคำสั่ง",
   "เฉพาะคำนวณ",
   "เฉพาะเล่นเกม",
   "เฉพาะพิมพ์", 0],

  ["Prompt ที่ดีควรเป็นอย่างไร",
   "ชัดเจนและมีบริบท",
   "สั้นที่สุดเสมอ",
   "มีแต่ตัวเลข",
   "ไม่มีรายละเอียด", 0],

  ["ข้อใดช่วยให้ตัวละครคงรูปแบบ",
   "กำหนดรายละเอียด Character ชัดเจน",
   "เปลี่ยนสีทุกฉาก",
   "ไม่บอกลักษณะ",
   "สุ่มทุกครั้ง", 0],

  ["Storyboard ใช้เพื่อ",
   "วางแผนฉากและลำดับเรื่อง",
   "เพิ่มอินเทอร์เน็ต",
   "สร้างรหัสผ่าน",
   "ตัดต่ออัตโนมัติ", 0],

  ["Motion หมายถึง",
   "การเคลื่อนไหว",
   "เสียง",
   "สี",
   "ขนาดไฟล์", 0],

  ["Camera movement คือ",
   "การเคลื่อนกล้อง",
   "การเปลี่ยนบทพูด",
   "การใส่เพลง",
   "การสร้างบัญชี", 0],

  ["ข้อใดเป็นการใช้ AI อย่างรับผิดชอบ",
   "ตรวจสอบลิขสิทธิ์และผลลัพธ์",
   "คัดลอกผลงาน",
   "ใช้ภาพใครก็ได้",
   "ไม่ตรวจสอบ", 0],

  ["Animation 30–60 วินาทีควรวางแผนอย่างไร",
   "แบ่งเรื่องเป็นฉากก่อนสร้าง",
   "ทำทุกอย่างพร้อมกัน",
   "ไม่ต้องเขียนเรื่อง",
   "สุ่มฉาก", 0],

  ["ก่อนส่งผลงานควร",
   "ตรวจภาพ เสียง เนื้อหา และแหล่งที่มา",
   "ส่งทันที",
   "ลบ Storyboard",
   "ไม่ต้องตรวจ", 0]
];

const f = document.getElementById("quiz");

qs.forEach((q, i) => {

  const d = document.createElement("div");
  d.className = "question";

  d.innerHTML =
    `<h3>${i + 1}. ${q[0]}</h3>` +
    q.slice(1, 5).map((answer, j) => `
      <label>
        <input type="radio" name="q${i}" value="${j}">
        ${answer}
      </label>
    `).join("");

  f.appendChild(d);
});


function grade() {

  let score = 0;

  qs.forEach((q, i) => {

    const answer =
      document.querySelector(`input[name="q${i}"]:checked`);

    if (answer && Number(answer.value) === q[5]) {
      score++;
    }

  });

  const percent = score * 10;

  // อ่านข้อมูลเดิม
  let studentData;

  try {

    studentData = JSON.parse(
      localStorage.getItem("aiAnimM2") ||
      '{"profile":{},"lessons":[],"score":null,"points":0,"prompt":"","mission":0}'
    );

  } catch (error) {

    studentData = {
      profile: {},
      lessons: [],
      score: null,
      points: 0,
      prompt: "",
      mission: 0
    };

  }


  // ป้องกันการบวกคะแนนซ้ำ
  const oldScore = studentData.score;

  if (oldScore === null) {
    studentData.points =
      (studentData.points || 0) + percent;
  }


  studentData.score = percent;

  localStorage.setItem(
    "aiAnimM2",
    JSON.stringify(studentData)
  );


  const result = document.getElementById("result");

  result.innerHTML = `
    <div class="result">

      🎯 คะแนนของคุณ

      <div style="font-size:42px;margin:10px 0;">
        ${score}/10
      </div>

      <div>
        คิดเป็น ${percent}%
      </div>

      <br>

      ${
        score >= 8
        ? "🎉 ผ่านเกณฑ์ ยอดเยี่ยม!"
        : "📚 ยังไม่ผ่านเกณฑ์ ลองทบทวนบทเรียนแล้วทำใหม่"
      }

      <br><br>

      ${
        oldScore === null
        ? `🏆 ได้รับแต้ม +${percent}`
        : "ℹ️ คะแนนถูกบันทึกแล้ว"
      }

    </div>
  `;

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });

}