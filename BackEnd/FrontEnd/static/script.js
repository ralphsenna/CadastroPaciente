let elemFormulario = document.querySelector("[data-Formulario]");
let elemTabela = document.querySelector("[data-Tabela]");
let gerenciador;
let atualizando = false;
let codigoPessoa = 0;

window.onload = init;

function init()
{
	gerenciador = new GerenciadorPacientes();
    gerenciador.restaurar();
	
	//exibirTabelaPacientes(gerenciador.listaPacientes, elemTabela);

	elemFormulario.onsubmit = () => 
	{
		return validarEntrada();
	}
}

function validarEntrada()
{
	let elemNome = document.querySelector("[data-Nome]");
	let elemCPF = document.querySelector("[data-CPF]");
	let elemEndereco = document.querySelector("[data-Endereco]");
	let elemNumero = document.querySelector("[data-Numero]");
	let elemCidade = document.querySelector("[data-Cidade]");
	let elemUF = document.querySelector("[data-UF]");
	let elemConvenio = document.querySelector("input[name='convenio']:checked");
	let elemDiabetico = document.querySelector("input[name='diabetico']:checked");
	let elemCardiaco= document.querySelector("input[name='cardiaco']:checked");
	let elemObeso = document.querySelector("input[name='obeso']:checked");

	let elemMensagem = document.querySelector("[data-Mensagem]");
	
	if (elemNome.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Informe o Nome do Paciente!";
		return false;
	}
	if (elemCPF.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Informe o CPF do Paciente!";
		return false;
	}
	if (elemEndereco.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Informe o Endereço do Paciente!";
		return false;
	}
	if (elemNumero.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Informe o Número da Casa do Paciente!";
		return false;
	}
	if (elemCidade.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Informe a Cidade onde o Paciente mora!";
		return false;
	}
	if (elemUF.value == "UF")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Selecione o Estado onde o Paciente mora!";
		return false;
	}
	if (elemConvenio.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Selecione se tem Convenio ou não!";
		return false;
	}
	
	if (elemDiabetico.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Selecione se tem Diabete ou não!";
		return false;
	}
	if (elemCardiaco.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Selecione se tem algum problema Cardíaco ou não!";
		return false;
	}
	if (elemObeso.value == "")
	{
		elemMensagem.className="alert alert-danger";
		elemMensagem.innerHTML="Selecione se tem Obesidade ou não!";
		return false;
	}
	
	paciente = new Paciente(0, elemNome.value, elemCPF.value, elemEndereco.value, elemNumero.value, elemCidade.value, elemUF.value, elemConvenio.value, elemDiabetico.value, elemCardiaco.value, elemObeso.value);
	if (atualizando)
	{
		paciente.codigo = codigoPaciente;
		gerenciador.atualizar(paciente);
		atualizando = false;
		document.querySelector("[data-BotaoCadastrar]").innerHTML='CADASTRAR';
	}
	else
	{
		gerenciador.adicionar(paciente);
	}
	//gerenciador.salvar();
	//elemMensagem.className="";
	//elemMensagem.innerHTML="";
	return false;
}

function exibirTabelaPacientes(listaPacientes, container)
{
	container.innerHTML = "";

	if (listaPacientes.length == 0)
	{
		container.innerHTML = "<p>Nenhum entrevistado cadastrado</p>";
		return;
	}
	
	let tabela = document.createElement("table");
	tabela.className = "table table-striped table-hover";

	let cabecalho = document.createElement("thead");
	cabecalho.className = "table-dark";

	let linhaCabecalho = document.createElement("tr");
	linhaCabecalho.innerHTML = "<th>Nome Completo</th>\
								<th>CPF</th>\
								<th>Endereço</th>\
								<th>Numero</th>\
								<th>Cidade</th>\
								<th>Estado</th>\
								<th>Convenio</th>\
								<th>Diabético</th>\
								<th>Cardíaco</th>\
								<th>Obeso</th>\
								<th>Ação</th>";
	cabecalho.appendChild(linhaCabecalho);

	tabela.appendChild(cabecalho);

	//criar o corpo da tabela
	let corpoTabela = document.createElement("tbody");
	
	for (let i=0; i<listaPacientes.length; i++)
	{
		let paciente = listaPacientes[i];
		let linha = document.createElement("tr");
		linha.innerHTML = "<td>" + paciente.nome + "</td>" +
						  "<td>" + paciente.cpf + "</td>" +
						  "<td>" + paciente.endereco + "</td>" +
						  "<td>" + paciente.numero + "</td>" +
						  "<td>" + paciente.cidade + "</td>" +
						  "<td>" + paciente.uf + "</td>" +
                          "<td>" + paciente.convenio + "</td>" +
						  "<td>" + paciente.diabetico + "</td>" +
						  "<td>" + paciente.cardiaco + "</td>" +
						  "<td>" + paciente.obeso + "</td>" +
						  "<td><button type='button' onclick='gerenciador.remover(" + paciente.codigo + ")' class='btn-close' aria-label='Close'></button>\
						 	   <button type='button' onclick='prepararAtualizacao(" + i + ")'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>\
							   <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>\
							   </svg></button></td>";
		corpoTabela.appendChild(linha);
	}

	tabela.appendChild(corpoTabela);
	container.appendChild(tabela);
}

function prepararAtualizacao(i)
{
	let elemNome = document.querySelector("[data-Nome]");
	let elemCPF = document.querySelector("[data-CPF]");
	let elemEndereco = document.querySelector("[data-Endereco]");
	let elemNumero = document.querySelector("[data-Numero]");
	let elemCidade = document.querySelector("[data-Cidade]");
	let elemUF = document.querySelector("[data-UF]");

	elemNome.value 			= gerenciador.listaPacientes[i].nome;
	elemCPF.value 			= gerenciador.listaPacientes[i].cpf;
	elemEndereco.value 		= gerenciador.listaPacientes[i].endereco;
	elemNumero.value 		= gerenciador.listaPacientes[i].numero;
	elemCidade.value 		= gerenciador.listaPacientes[i].cidade;
	elemUF.value 			= gerenciador.listaPacientes[i].uf;

	document.querySelector("input[id='" + gerenciador.listaPacientes[i].convenio + "']").checked = true;
	document.querySelector("input[id='" + gerenciador.listaPacientes[i].diabetico + "']").checked = true;
	document.querySelector("input[id='" + gerenciador.listaPacientes[i].cardiaco + "']").checked = true;
	document.querySelector("input[id='" + gerenciador.listaPacientes[i].obeso + "']").checked = true;

	document.querySelector("[data-BotaoCadastrar]").innerHTML='ATUALIZAR';
	atualizando = true;
	codigoPaciente = gerenciador.listaPacientes[i].codigo;
}