class Grid {
    constructor(configs){
        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate:  '.btn-update',
            btnDelete:  '.btn-delete'
        }, configs);

        this.initForms();
        this.initButtons();
    }

    initForms(){
        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json => {
            Swal.fire(
                'Salvo!',
                this.options.crateMsg,
                'success'
                ).then(sucess => {
                    window.location.reload();
                });
            }).catch(err => {
                console.log(err);
            });

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save().then(json => {
            Swal.fire(
            'Alterado!',
            this.options.updateMsg,
            'success'
        ).then(sucess => {
            window.location.reload();
        });
        }).catch(err => {
            console.log(err);
        }); 
    }

    getTrData(e){
        let tr = e.path.find(el => {
            return (el.tagName.toUpperCase() === 'TR');
        });

        return JSON.parse(tr.dataset.row);
    }

    initButtons(){
        var itemSelecionado = {};

        $('#menu-notas').hide();

        function selecionarItem(row) {
        let selecionado = row.getElementsByTagName("td");
        itemSelecionado = JSON.parse(row.dataset.row);
        if(itemSelecionado.id_aluno){
            $('#menu-notas').show();
            $('#nomeAluno').html(itemSelecionado.nome_aluno);
        }else{
            $('#menu-notas').hide();
        };
        };

        function consultarNotas(){

        let data = itemSelecionado;

        if (data) {
        
            console.log(data);
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Selecione um aluno para visualizar as notas!',
                text: ''
            }).then(e => {
                window.location.reload()
            });
        };
        };

        [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {

            btn.addEventListener('click', e => {

                let data = this.getTrData(e);

                Swal.fire({
                    title: 'Você tem certeza?',
                    text: eval('`' + this.options.deleteMsg + '`'),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim!'
                }).then((result) => {
                    if (result.value) {

                        fetch(eval('`'+this.options.deleteUrl+'`'), {
                                method: 'DELETE'

                            }).then(response => response.json())

                            .then(json => {

                                Swal.fire(
                                    'Excluído!',
                                    'O Aluno foi excluído.',
                                    'success'
                                ).then(sucess => {
                                    window.location.reload();
                                });
                            });
                    }
                });
            });
        });

        [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn => {
            btn.addEventListener('click', e => {
                
                let data = this.getTrData(e);

                for (let name in data) {
                
                    let input = this.formUpdate.querySelector(`[name=${name}]`);

                    switch (name) {
                        case this.options.nameData:
                            if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
                            break;
                        default:
                            if (input) input.value = data[name]; 
                    }

                }
                $('#modal-update').modal('show');
            });
        });

        var tr = $('table tr:not(:first-child)');
        tr.on('click', function () {
            tr.not(this).removeClass('colorir');
            $(this).toggleClass('colorir');
        });

    }
}