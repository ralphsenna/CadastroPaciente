from flask import Flask, jsonify, make_response, request, render_template
from Persistencia.PacienteDB import PacienteDB
from Modelo.Paciente import Paciente

app = Flask(__name__, static_folder='FrontEnd/static',
                      template_folder='FrontEnd/templates') #servidor HTTP está no app

@app.route("/entrevistarPacientes", methods=["GET"])
def interface_entrevistarPacientes():
    return render_template('cadastroPaciente.html')

@app.route("/", methods=["GET"])
def hello_world():
    return """<html>
                  <head>
                      <title>Página principal</title>  
                  </head>
                  <body>
                      API que oferece recursos do tipo Paciente
                      Resursos compartilhados no formato JSON
                  </body>   
              </html>
           """

@app.route("/pacientes", methods=["GET"])
@app.route("/pacientes/<int:codigo>", methods=["GET"])
def obter_pacientes(codigo = None):
    pacienteDB = PacienteDB()
    #lista de pessoas do tipo Pessoa
    if codigo:
        pacientes = pacienteDB.consultar(codigo)
    else:
        pacientes = pacienteDB.consultar("")

    pacientes = [paciente.__dict__() for paciente in pacientes]

    return make_response(jsonify(pacientes)) #transformando em json

@app.route("/adicionarPaciente", methods=["POST"])
def adicionar_paciente():
    if request.is_json:
        dados = request.get_json()
        try:
            nome                = dados['nome']
            cpf                 = dados['cpf']
            endereco            = dados['endereco']
            numero              = dados['numero']
            cidade              = dados['cidade']
            uf                  = dados['uf']
            convenio            = dados['convenio']
            diabetico           = dados['diabetico']
            cardiaco            = dados['cardiaco']
            obeso               = dados['obeso']

            paciente = Paciente(codigo = 0,
                            nome = nome,
                            cpf = cpf,
                            endereco = endereco,
                            numero = numero,
                            cidade = cidade,
                            uf = uf,
                            convenio = convenio,
                            diabetico = diabetico,
                            cardiaco = cardiaco,
                            obeso = obeso)
            pacienteDB = PacienteDB()
            pacienteDB.incluir(paciente)
            resposta = {
                            'codigo':paciente.codigo
                       }
            return make_response(jsonify(resposta))
        except KeyError:
            resposta = {
                            'status':'falha'
                       }
            return make_response(jsonify(resposta))
    else:
        return ''        

@app.route("/excluirPaciente/<int:codigo>", methods=["DELETE"])
def excluir_paciente(codigo = None):
    """
        Aquele que queira utilizar o recurso excluirPaciente deve
        conhecer o cpf cadastrada para a pessoa
        Chave de acesso = "sim"
    """
    resposta = {'status':'não autorizado'}

    if codigo and request.is_json:
        dados = request.get_json()
        chave = dados.get('chave')
        if chave and chave == "sim":
            pacienteDB = PacienteDB()
            resultadoBusca = pacienteDB.consultar(codigo)
            if len(resultadoBusca) > 0:
                paciente = resultadoBusca[0]
                pacienteDB.excluir(paciente)
                resposta['status'] = 'excluído'
            else:
                resposta['status'] = 'código não encontrado'
    
    return make_response(jsonify(resposta))

@app.route("/atualizarPaciente", methods=["PUT"])
def atualizar_paciente():
    if request.is_json:
        dados = request.get_json()
        try:
            codigo              = dados['codigo']
            nome                = dados['nome']
            cpf                 = dados['cpf']
            endereco            = dados['endereco']
            numero              = dados['numero']
            cidade              = dados['cidade']
            uf                  = dados['uf']
            convenio            = dados['convenio']
            diabetico           = dados['diabetico']
            cardiaco            = dados['cardiaco']
            obeso               = dados['obeso']

            paciente = Paciente(codigo = codigo,
                            nome = nome,
                            cpf = cpf,
                            endereco = endereco,
                            numero = numero,
                            cidade = cidade,
                            uf = uf,
                            convenio = convenio,
                            diabetico = diabetico,
                            cardiaco = cardiaco,
                            obeso = obeso)
            pacienteDB = PacienteDB()
            resultadoBusca = pacienteDB.consultar(codigo)
            if len(resultadoBusca) > 0:
                pacienteDB.alterar(paciente)
                resposta =  {
                                'status':'alterado'
                            }
            else:
                resposta =  {
                                'status':'paciente não encontrado'
                            }            
            return make_response(jsonify(resposta))
        except KeyError:
            resposta = {
                            'status':'falha'
                       }
            return make_response(jsonify(resposta))
    else:
        return ''  

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")
    """IP 0.0.0.0 significa que as requisições
       poderão ser provenientes de qq interface"""        