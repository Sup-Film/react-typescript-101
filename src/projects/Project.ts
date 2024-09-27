// กำหนด Class ชื่อ Project สำหรับเก็บข้อมูลโปรเจค
export class Project {
  id: number | undefined;
  name: string = '';
  description: string = '';
  imageUrl: string = '';
  contractTypeId: number | undefined;
  contractSignedOn: Date = new Date();
  budget: number = 0;
  isActive: boolean = false;
  get isNew(): boolean {
    return this.id === undefined;
  }

  // Constructor จะถูกเรียกเมื่อสร้าง Object ใหม่จาก Class นี้ และใช้สำหรับกำหนดค่าเริ่มต้นให้กับ Object
  // การใช้ ? หลังชื่อ Property หมายถึง Property นั้นสามารถเป็นค่า null หรือ undefined ได้
  constructor(initializer?: any) {
    if (!initializer) return; // เช็คว่ามีการส่งค่าเข้ามาหรือไม่ ถ้าไม่มีก็จะ return
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.description = initializer.description;
    if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
    if (initializer.contractTypeId)
      this.contractTypeId = initializer.contractTypeId;
    if (initializer.contractSignedOn)
      this.contractSignedOn = new Date(initializer.contractSignedOn);
    if (initializer.budget) this.budget = initializer.budget;
    if (initializer.isActive) this.isActive = initializer.isActive;
  }
}