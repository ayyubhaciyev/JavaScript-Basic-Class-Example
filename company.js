class Company{
    emp = {
        names: ["Kamil Mahirli","Aydan Qasımzadə","Ruqiyyə Abdulzadə"],
        positions: ["SEO","Full Stack Developer","Full Stack Developer"],
        salary:[1200,3000,3000]
    };
    constructor(name,branch,taxNumber){
        this.name = name;
        this.branch = branch;
        this.taxNumber = taxNumber;
    }
    get companyName(){
        return this.name;
    }
    get companyBranch(){
        return this.branch;
    }
    get companyTaxNumber(){
        return this.taxNumber;
    }
    get empList(){
        return this.emp;
    }

    addEmp(name,position,salary){
        this.emp.names.push(name);
        this.emp.positions.push(position);
        this.emp.salary.push(salary);
    }
    deleteEmp(i){
        this.emp.names.splice(i,1);
        this.emp.positions.splice(i,1);
        this.emp.salary.splice(i,1);
    }
    updateEmp(i,name,position,salary){
        console.log(i,name,position,salary);
        this.emp.names[i] = name;
        this.emp.positions[i] = position;
        this.emp.salary[i] = salary;
    }
}