class Paciente
{
	constructor(nome, cpf, endereco, numero, cidade, uf, convenio, diabetico, cardiaco, obeso)
	{
		this.nome = nome;
		this.cpf = cpf;
		this.endereco = endereco;
		this.numero = numero;
		this.cidade = cidade;
		this.uf = uf;
		this.convenio = convenio;
		this.diabetico = diabetico;
		this.cardiaco = cardiaco;
		this.obeso = obeso;
	}
}

class GerenciadorPacientes
{
	constructor()
	{
		this.listaPacientes = [];
	}
	
	adicionar(paciente)
	{
		this.listaPacientes.push(paciente);
	}
	
	remover(paciente)
	{
		for(let i=0; i<this.listaPacientes.length; i++)
			if(this.listaPacientes[i].cpf==paciente.cpf)
			{
				this.listaPacientes.splice(i,1);
				break;
			}		
	}
	
	salvar()
	{
		localStorage.paciente = JSON.stringify(this.listaPacientes);
	}
	
	restaurar()
	{
		this.listaPacientes = JSON.parse(localStorage.paciente)
	}
}