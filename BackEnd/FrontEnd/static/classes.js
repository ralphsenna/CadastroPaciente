class Paciente
{
	constructor(codigo, nome, cpf, endereco, numero, cidade, uf, convenio, diabetico, cardiaco, obeso)
	{
		this.codigo = codigo;
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
		fetch('http://localhost:5000/adicionarPaciente',{method:'POST',
														headers:{
																    'Content-Type':'application/json',
																    'Accept':'application/json'
													   			},
														body:JSON.stringify(paciente)
													 	}).then((resposta) => {
														if (resposta.ok)
														{
															return resposta.json();
														}
													  	}).then((dados) => {  
														if (dados['codigo'] != undefined)
														{
															paciente.codigo = dados['codigo']
															this.listaPacientes.push(paciente);
															exibirTabelaPacientes(this.listaPacientes, elemTabela);
														}
														else
														{
															let elemMensagem = document.querySelector("[data-Mensagem]");
															elemMensagem.className="alert alert-danger";
															elemMensagem.innerHTML="Erro ao tentar inserir os dados no servidor";
														}
													    });
	}
	
	remover(codigo)
	{
		let chave = prompt("Informe a chave: ");
		let dados = {'chave':chave};
		fetch("http://localhost:5000/excluirPaciente/"+codigo, {method:'DELETE',
																headers:{
																			'Content-Type':'application/json',
																			'Accept':'application/json'
																		},
																body:JSON.stringify(dados)
																}).then((resposta) => {
																if (resposta.ok)
																{
																	return resposta.json();
																}
																}).then((dados) => {
																if (dados['status'] == 'excluído')
																{
																	for (let i=0; i<this.listaPacientes.length; i++)
																	{
																		if (this.listaPacientes[i].cpf==paciente.cpf)
																		{
																			this.listaPacientes.splice(i, 1);
																			break;
																		}	
																	}
																	exibirTabelaPacientes(this.listaPacientes, elemTabela);
																}
																else
																{
																	let elemMensagem = document.querySelector("[data-Mensagem]");
																	elemMensagem.className="alert alert-danger";
																	elemMensagem.innerHTML=dados['status'];
																}
																});
	}

	atualizar(paciente)
	{
		fetch('http://localhost:5000/atualizarPaciente',{method:'PUT',
														headers:{
																	'Content-Type':'application/json',
																	'Accept':'application/json'
																},
														body:JSON.stringify(paciente)
														}).then((resposta) => {
														if (resposta.ok)
														{
															return resposta.json();
														}
														}).then((dados) => {  
														if (dados['status'] == 'alterado')
														{
															for (let i=0; i<this.listaPacientes.length; i++)
															{
																if (this.listaPacientes[i].codigo == paciente.codigo)
																{
																	this.listaPacientes[i] = paciente;
																	break;
																}	
															}
															exibirTabelaPacientes(this.listaPacientes, elemTabela);
														}
														else
														{
															let elemMensagem = document.querySelector("[data-Mensagem]");
															elemMensagem.className="alert alert-danger";
															elemMensagem.innerHTML="Erro ao tentar inserir os dados no servidor";
														}
														});
	}
	
	/*salvar()
	{
		localStorage.paciente = JSON.stringify(this.listaPacientes);
	}*/
	
	restaurar()
	{
		/*if (localStorage.paciente != undefined)
		{
			this.listaPacientes = JSON.parse(localStorage.paciente)
		}*/

		//código assincrono
		fetch('http://localhost:5000/pacientes', {method:'GET', cache:'default'})
		.then((resposta) => {
			if(resposta.ok)
			{
				return resposta.json();
			}
		}).then((dados) => {
			if (dados!=undefined)
			{
				for (let i=0; i<dados.length; i++)
				{
					let dadosPaciente = dados[i];
					let paciente = new Paciente(dadosPaciente['codigo'],
												dadosPaciente['nome'],
												dadosPaciente['cpf'],
												dadosPaciente['endereco'],
												dadosPaciente['numero'],
												dadosPaciente['cidade'],
												dadosPaciente['uf'],
												dadosPaciente['convenio'],
												dadosPaciente['diabetico'],
												dadosPaciente['cardiaco'],
												dadosPaciente['obeso']);
					this.listaPacientes.push(paciente);					
				}
			}
			exibirTabelaPacientes(this.listaPacientes, elemTabela);
		});
	}
}