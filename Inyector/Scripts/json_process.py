import os
from typing import Literal

class NoSQL_Process:
    # =============== CONSTRUCTOR ===============
    def __init__(self, version:Literal['A','B','C','D']):
        ''' 
        '''
        
        self.version = version.upper()
        self.location_path = os.path.dirname(os.path.dirname(__file__)) # Te deja en la ruta: Inyector/


    # =============== METODOS PRIVADOS ===============
    # ======== Version A
    def __leer_archivo_version_A(self):
        '''
        '''

    def __parsear_archivo_version_A(self):
        '''
        '''

    def __preparar_payload_version_A(self):
        '''
        '''

    def __enviar_info_version_A(self):
        '''
        '''

    def __procesar_version_A(self):
        '''
        '''
        self.__leer_archivo_version_A()
        self.__parsear_archivo_version_A()
        self.__preparar_payload_version_A()
        self.__enviar_info_version_A()











    # ======== Version B
    def __leer_archivo_version_B(self):
        '''
        '''

    def __parsear_archivo_version_B(self):
        '''
        '''

    def __preparar_payload_version_B(self):
        '''
        '''

    def __enviar_info_version_B(self):
        '''
        '''

    def __procesar_version_B(self):
        '''
        '''
        self.__leer_archivo_version_B()
        self.__parsear_archivo_version_B()
        self.__preparar_payload_version_B()
        self.__enviar_info_version_B()











    # ======== Version C
    def __leer_archivo_version_C(self):
        '''
        '''

    def __parsear_archivo_version_C(self):
        '''
        '''

    def __preparar_payload_version_C(self):
        '''
        '''

    def __enviar_info_version_C(self):
        '''
        '''

    def __procesar_version_C(self):
        '''
        '''
        self.__leer_archivo_version_C()
        self.__parsear_archivo_version_C()
        self.__preparar_payload_version_C()
        self.__enviar_info_version_C()











    # ======== Version D
    def __leer_archivo_version_D(self):
        '''
        '''

    def __parsear_archivo_version_D(self):
        '''
        '''

    def __preparar_payload_version_D(self):
        '''
        '''

    def __enviar_info_version_D(self):
        '''
        '''

    def __procesar_version_D(self):
        '''
        '''
        self.__leer_archivo_version_D()
        self.__parsear_archivo_version_D()
        self.__preparar_payload_version_D()
        self.__enviar_info_version_D()











    # =============== METODOS PUBLICOS ===============
    def procesar(self):

        if self.version == 'A':   self.__procesar_version_A()
        elif self.version == 'B': self.__procesar_version_B()
        elif self.version == 'C': self.__procesar_version_C()
        elif self.version == 'D': self.__procesar_version_D()
        else: raise Exception(f'No se proporcionó una versión valida. Se espera sólo A, B, C o D, pero se ingresó: {self.version}')