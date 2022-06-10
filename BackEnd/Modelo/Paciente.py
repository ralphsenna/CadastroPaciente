class Paciente(object):
    #construtor
    def __init__(self, codigo=0, nome="", cpf="", endereco="", numero=0, cidade="", uf="", convenio="", diabetico="", cardiaco="", obeso=""):
        #atributos são privados
        self.__codigo = codigo
        self.__nome = nome
        self.__cpf = cpf
        self.__endereco = endereco
        self.__numero = numero
        self.__cidade = cidade
        self.__uf = uf
        self.__convenio = convenio
        self.__diabetico = diabetico
        self.__cardiaco = cardiaco
        self.__obeso = obeso
        
    #métodos get e set públicos
    #codigo
    @property
    def codigo(self):
        return self.__codigo
    
    @codigo.setter
    def codigo(self, codigo):
        self.__codigo = codigo

    #____________________________________
    
    #nome
    @property
    def nome(self):
        return self.__nome
    
    @nome.setter
    def nome(self, nome):
        self.__nome = nome
        
    #____________________________________
    #cpf
    @property
    def cpf(self):
        return self.__cpf
    
    @cpf.setter
    def cpf(self, cpf):
        self.__cpf = cpf
        
    #____________________________________    
    #endereco
    @property
    def endereco(self):
        return self.__endereco
    
    @endereco.setter
    def endereco(self, endereco):
        self.__endereco = endereco
           
    #____________________________________
    #numero
    @property
    def numero(self):
        return self.__numero
    
    @numero.setter
    def numero(self, numero):
        self.__numero = numero  
    
    #____________________________________
    #cidade
    @property
    def cidade(self):
        return self.__cidade
    
    @cidade.setter
    def cidade(self, cidade):
        self.__cidade = cidade
    
    #____________________________________
    #uf
    @property
    def uf(self):
        return self.__uf
    
    @uf.setter
    def uf(self, uf):
        self.__uf = uf
        
    #____________________________________
    #convenio
    @property
    def convenio(self):
        return self.__convenio
    
    @convenio.setter
    def convenio(self, convenio):
        self.__convenio = convenio

    #____________________________________
    #diabetico
    @property
    def diabetico(self):
        return self.__diabetico
    
    @diabetico.setter
    def diabetico(self, diabetico):
        self.__diabetico = diabetico

    #____________________________________
    #cardiaco
    @property
    def cardiaco(self):
        return self.__cardiaco
    
    @cardiaco.setter
    def cardiaco(self, cardiaco):
        self.__cardiaco = cardiaco

    #____________________________________
    #obeso
    @property
    def obeso(self):
        return self.__obeso
    
    @obeso.setter
    def obeso(self, obeso):
        self.__obeso = obeso    

    def __dict__(self):
        return {
                   "codigo":            self.__codigo,
                   "nome":              self.__nome,
                   "cpf":               self.__cpf,
                   "endereco":          self.__endereco,
                   "numero":            self.__numero,
                   "cidade":            self.__cidade,
                   "uf":                self.__uf,
                   "convenio":          self.__convenio,
                   "diabetico":         self.__diabetico,
                   "cardiaco":          self.__cardiaco,
                   "obeso":             self.__obeso
               }