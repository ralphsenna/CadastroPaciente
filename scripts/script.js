let elemFormulario = document.querySelector("[data-Formulario]");
let gerenciador;

window.onload = init;

function init()
{
	gerenciador = new GerenciadorPacientes();
    gerenciador.restaurar();
	
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
	let elemConvenio = document.querySelector("input[name='Convenio']:checked");
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
	
	paciente = new Paciente(elemNome.value, elemCPF.value, elemEndereco.value, elemNumero.value, elemCidade.value, elemUF.value, elemConvenio.value, elemDiabetico.value, elemCardiaco.value, elemObeso.value);
	gerenciador.adicionar(paciente);
	gerenciador.salvar();
	elemMensagem.className="";
	elemMensagem.innerHTML="";
	return true;
}