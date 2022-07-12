import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public formGroupReservas!: FormGroup;

  public dataFormulario: Array<any> = [];

  public dataFormularioFiltrar: Array<any> = [];

  private id: number = 1;

  private idEditar: number = 0;

  public textoBoton: string = 'LISTAR ';


  constructor(
    private _builder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.inicializacionFormulario();
    this.buscarData();
  }

  private inicializacionFormulario(): void {
    this.formGroupReservas = this._builder.group({
      nombre: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      numing: ['', [Validators.required]],
      calorias: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      filter: ['']

    });
  }

  public guardarData(data: any): void {
    const save = {
      id: this.id,
      nombre: data.nombre,
      peso: data.peso,
      numing: data.numing,
      calorias: data.calorias,
      precio: data.precio,
    };

    if (this.idEditar !== 0) {
      save.id = this.idEditar;
      const indexEditar = this.dataFormulario.findIndex(data => data.id === this.idEditar);
      this.dataFormulario[indexEditar] = save;
      this.textoBoton = 'LISTAR';
      this.idEditar = 0;
    } else {
      this.dataFormulario.push(save);
      this.id++;
    }
    this.dataFormularioFiltrar = this.dataFormulario;
    this.formGroupReservas.reset();
  }

  public editar(id: number): void {
    this.textoBoton = 'Editar';
    this.idEditar = id;
    const editarForm = this.dataFormulario.find(data => data.id === id);
    this.formGroupReservas.patchValue(editarForm);
  }

  public eliminar(id: number): void {
    this.dataFormulario = this.dataFormulario.filter(data => data.id !== id);
    this.dataFormularioFiltrar = this.dataFormulario;
  }

  public buscarData() {
    this.formGroupReservas.get('filter')?.valueChanges.subscribe(data => {
      debugger;
      if (!!data) {
        this.dataFormulario = this.dataFormularioFiltrar.filter(option => option.nombre?.toLowerCase().includes(data?.toLowerCase()));
      }
      if (data === "") {
        this.dataFormulario = this.dataFormularioFiltrar;
      }
    });
  }
}