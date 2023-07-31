const yuptech = new Company("Yup Technology LLC","Baku","1902402121");

onload = ()=>{
    createMeta();
    createHTML();
};

const createMeta = ()=>{
    document.title = yuptech.companyName;
}

const createHTML = ()=>{
    let HTML = `
        <main class="container">
        ${createTitle()}
        ${createAddButton()}
        ${createTable()}
        </main>
        ${createAddModal()}
        ${createEditModal()}
    `;

    document.getElementsByTagName("body")[0].innerHTML = HTML;
}

const createTitle = ()=>{
    return `<h1 class="text-center display-4">${yuptech.companyName} (${yuptech.companyBranch})</h1>`;
}
const createAddButton = ()=>{
    return `<div class="float-end"><button data-bs-toggle="modal" data-bs-target="#add" class="btn btn-outline-info btn-sm">Əlavə et</button></div>`;
}
const createTable = ()=>{
    return `
        <table class="table">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Ad Soyad</th>
                    <th>Vəzifə</th>
                    <th>Maaş</th>
                    <th>Əməliyyat</th>
                </tr>
            </thead>
            <tbody>
            ${getEmpList()}
            </tbody>
        </table>
    `;
}

const getEmpList = ()=>{
    let list = '';

    for(let i = 0; i < yuptech.empList.names.length; i++){
        list += `
            <tr>
                <td>${i + 1}</td>
                <td>${yuptech.empList.names[i]}</td>
                <td>${yuptech.empList.positions[i]}</td>
                <td>${yuptech.empList.salary[i]} AZN</td>
                <td>
                    ${btnUpdate(i)}
                    ${btnDelete(i)}
                </td>
            </tr>
        `;
    }
    return list;
}

const btnDelete = (i)=>{
    return `<button onclick="deleteEmp(${i})" class="btn btn-outline-danger btn-sm">Sil</button>`;
}
const btnUpdate = (i)=>{
    return `<button onclick="editView(${i})" class="btn btn-outline-warning btn-sm">Dəyişdir</button>`;
}

const createAddModal = ()=>{
    return `
    <div class="modal fade" id="add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Yeni Əməkdaş</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="name" class="col-form-label">Ad Soyad:</label>
              <input type="text" class="form-control" id="name">
            </div>
            <div class="mb-3">
                <label for="position" class="col-form-label">Vəzifə:</label>
                <input type="text" class="form-control" id="position">
            </div>
            <div class="mb-3">
                <label for="salary" class="col-form-label">Maaş:</label>
                <input type="number" class="form-control" id="salary">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bağla</button>
          <button type="button" onclick="addEmp()" class="btn btn-primary">Əlavə et</button>
        </div>
      </div>
    </div>
  </div>
    `;
};
const createEditModal = ()=>{
    return `
    <div class="modal fade" id="edit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Əməkdaşın informasiyalarını yeniləyirsiniz!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
          <input type="hidden" id="edit_id" />
            <div class="mb-3">
              <label for="edit_name" class="col-form-label">Ad Soyad:</label>
              <input type="text" class="form-control" id="edit_name">
            </div>
            <div class="mb-3">
                <label for="edit_position" class="col-form-label">Vəzifə:</label>
                <input type="text" class="form-control" id="edit_position">
            </div>
            <div class="mb-3">
                <label for="edit_salary" class="col-form-label">Maaş:</label>
                <input type="number" class="form-control" id="edit_salary">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bağla</button>
          <button type="button" onclick="editEmp()" class="btn btn-primary">Redaktə et</button>
        </div>
      </div>
    </div>
  </div>
    `;
};
const editView = (i) =>{
    const myModal = new bootstrap.Modal(document.getElementById('edit'));
    document.getElementById("edit_id").value = i;
    document.getElementById("edit_name").value = yuptech.emp.names[i];
    document.getElementById("edit_position").value = yuptech.emp.positions[i];
    document.getElementById("edit_salary").value = yuptech.emp.salary[i];
    myModal.show();
};
const addEmp = ()=>{
    const myModal = new bootstrap.Modal(document.getElementById('add'));
    const name = document.getElementById("name");
    const position = document.getElementById("position");
    const salary = document.getElementById("salary");

    if(name.value.length > 0 && position.value.length > 0 && salary.value > 0){
        yuptech.addEmp(name.value,position.value,salary.value);
        name.value = '';
        position.value = '';
        salary.value = '';
        myModal.hide();
        createHTML();
    }
}

const deleteEmp = (i)=>{
    swal({
        title: "Diqqət!",
        text: "Silinən informasiya geri qaytarılmır!",
        icon: "warning",
        buttons: ['İmtina et!','Sil'],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            yuptech.deleteEmp(i);
            swal("Uğurla silindi!", {
                icon: "success",
              });
            createHTML();
        } else {
            swal("imtina edildi!", {
                icon: "success",
              });
        }
      });
}

const editEmp = ()=>{
    const myModal = new bootstrap.Modal(document.getElementById('edit'));
    const id = document.getElementById("edit_id");
    const name = document.getElementById("edit_name");
    const position = document.getElementById("edit_position");
    const salary = document.getElementById("edit_salary");

    if(name.value.length > 0 && position.value.length > 0 && salary.value > 0){
        yuptech.updateEmp(id.value,name.value,position.value,salary.value);
        name.value = '';
        position.value = '';
        salary.value = '';
        myModal.hide();
        createHTML();
    }
};