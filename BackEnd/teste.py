from Modelo.Paciente import Paciente
from Persistencia.PacienteDB import PacienteDB

paciente1 = Paciente(nome = "João",\
                     cpf = "865.998.753-33",\
                     endereco = "Rua Pereira Jardim",\
                     numero = 201,\
                     cidade = "Regente Feijo",\
                     uf = "MG",\
                     convenio = "true",\
                     diabetico = "true",\
                     cardiaco = "true",\
                     obeso = "true")

paciente2 = Paciente(nome = "Rafael",\
                     cpf = "466.556.268-70",\
                     endereco = "Rua Armando Januario",\
                     numero = 351,\
                     cidade = "Tarabai",\
                     uf = "SP",\
                     convenio = "false",\
                     diabetico = "false",\
                     cardiaco = "false",\
                     obeso = "true")

pacienteDB = PacienteDB()

#pacienteDB.incluir(paciente1)
#pacienteDB.incluir(paciente2)

#pacienteAlterar = Paciente(nome = "Rafael", cpf = "466.556.268-70", endereco = "Rua Armando Januario", numero = 351, cidade = "Tarabai", uf = 'SP', convenio = 'false', diabetico = 'false', cardiaco = 'false', obeso = "true", codigo = 2)
#pacienteDB.alterar(pacienteAlterar)

#pacienteExcluir = Paciente(codigo = 1)
#pacienteDB.excluir(pacienteExcluir)    