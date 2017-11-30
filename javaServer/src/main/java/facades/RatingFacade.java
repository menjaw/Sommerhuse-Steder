/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Rating;
import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

/**
 *
 * @author danni
 */
public class RatingFacade implements IratingFacade {
    
    EntityManagerFactory emf;
    
    public RatingFacade(){
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public RatingFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }
    
    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    @Override
    public void setSingleRating(Rating rating, User user) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Rating> getSingleRating(Long id) {
        EntityManager em = getEntityManager();
        try{
            Query query = em.createQuery("SELECT r FROM SEED_RATING r WHERE PLACEID = 1");
            return (List<Rating>) query.getResultList();
        }finally{
            em.close();
        }
    }
    
    public static void main(String[] args) {
        RatingFacade rf = new RatingFacade();
        
    }
    
}
