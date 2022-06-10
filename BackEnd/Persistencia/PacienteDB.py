"""
Classe PacienteDB é a classe que tem como responsabilidade conhecer
os métodos para armazenar e recuperar pessoas do banco de dados
"""

import sqlite3
from Modelo.Paciente import Paciente

caminhoBancoDeDados = 'Persistencia/Dados/BancoDeDados.db'

class PacienteDB(object):

    def __init__(self):
        self.conexao = sqlite3.connect(caminhoBancoDeDados)
        cursor = self.conexao.cursor()
        cursor.execute("""
                        CREATE TABLE IF NOT EXISTS Paciente(
                            codigo INTEGER not null primary key autoincrement,
                            nome TEXT not null,
                            cpf TEXT not null,
                            endereco TEXT not null,
                            numero INTEGER not null,
                            cidade TEXT not null,
                            uf TEXT not null,
                            convenio TEXT not null,
                            diabetico TEXT not null,
                            cardiaco TEXT not null,
                            obeso TEXT not null
                        )
                       """)
        self.conexao.commit()
    
    def incluir(self, paciente):
        if isinstance(paciente, Paciente):
            cursor = self.conexao.cursor()
            cursor.execute("""
                            INSERT INTO Paciente (nome,
                                                  cpf,
                                                  endereco,
                                                  numero,
                                                  cidade,
                                                  uf,
                                                  convenio,
                                                  diabetico,
                                                  cardiaco,
                                                  obeso)
                            VALUES (?,?,?,?,?,?,?,?,?,?)
                           """, (paciente.nome, paciente.cpf, paciente.endereco, paciente.numero, paciente.cidade,\
                                 paciente.uf, paciente.convenio, paciente.diabetico, paciente.cardiaco, paciente.obeso))
            paciente.codigo = cursor.lastrowid
            self.conexao.commit()
    
    def alterar(self, paciente):
        if isinstance(paciente, Paciente):
            cursor = self.conexao.cursor()
            cursor.execute("""
                            UPDATE Paciente SET nome = ?,
                            cpf = ?,
                            endereco = ?,
                            numero = ?,
                            cidade = ?,
                            uf = ?,
                            convenio = ?,
                            diabetico = ?,
                            cardiaco = ?,
                            obeso = ?
                            WHERE codigo = ? 
                           """, (paciente.nome, paciente.cpf, paciente.endereco, paciente.numero, paciente.cidade,\
                                 paciente.uf, paciente.convenio, paciente.diabetico, paciente.cardiaco, paciente.obeso, paciente.codigo))
            self.conexao.commit()
        
    def excluir(self, paciente):
        if isinstance(paciente, Paciente):
            cursor = self.conexao.cursor()
            cursor.execute("DELETE FROM Paciente WHERE codigo = ?", [paciente.codigo])
            self.conexao.commit()
        
    def consultar(self, termoBusca): 
        """
        Parameters
        ----------
        termoBusca : Pode ser do tipo inteiro ou string
            Se o termo for um inteiro, recupera da tabela paciente
            um registro cujo código seja igual a esse inteiro, se não
            exitir um paciente com esse código, retorna uma  lista vazia
            Se o termo for uma string, recupera da tabela paciente registros
            cujas partes dos nomes contenham o termo buscado. Se encontrar,
            retorna uma lista com esses registros.

        Returns
        -------
        Uma lista de pacientes (vazia ou não) contendo objetos do tipo Paciente

        """   
        cursor = self.conexao.cursor()

        if isinstance(termoBusca, int):
            cursor.execute("""
                               SELECT codigo, nome, cpf, endereco, numero, cidade, uf, convenio, diabetico, cardiaco, obeso
                               FROM Paciente       
                               WHERE codigo = ?
                           """, [termoBusca])
            registro = cursor.fetchone()
            if (registro):
                paciente = Paciente(codigo = registro[0],
                                  nome = registro[1], 
                                  cpf = registro[2], 
                                  endereco = registro[3], 
                                  numero = registro[4], 
                                  cidade = registro[5], 
                                  uf = registro[6],
                                  convenio = registro[7], 
                                  diabetico = registro[8], 
                                  cardiaco = registro[9], 
                                  obeso = registro[10])
                return [paciente]
            else:
                return []
            
        elif isinstance(termoBusca, str):
            termoBusca = termoBusca.lower()
            cursor.execute("""
                               SELECT codigo, nome, cpf, endereco, numero, cidade, uf, convenio, diabetico, cardiaco, obeso
                               FROM Paciente       
                               WHERE lower(nome) like ?
                           """, ("%" + termoBusca + "%",))
            registros = cursor.fetchall()
            pacientes = []
            if (registros):
                for registro in registros:
                    paciente = Paciente(codigo = registro[0],
                                  nome = registro[1], 
                                  cpf = registro[2], 
                                  endereco = registro[3], 
                                  numero = registro[4], 
                                  cidade = registro[5], 
                                  uf = registro[6],
                                  convenio = registro[7], 
                                  diabetico = registro[8], 
                                  cardiaco = registro[9], 
                                  obeso = registro[10])
                    pacientes.append(paciente)
                return pacientes
            else:
                return []                          